import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';
import { client } from '../../../lib/sanity';
import { LICENSES } from '../../../lib/constants';
import { VAULT_COOKIE, isValidCookie } from '../../../lib/vault';
import { CURRENCY, PAY_URL } from '../../../lib/payment';

const LIC = Object.fromEntries(LICENSES.map(l => [l.key, l]));
const CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_ITEMS = 25;

const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter(t => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > 8;
}

const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const usd = n => `$${Number.isInteger(n) ? n : n.toFixed(2)}`;

function newOrderCode() {
  let s = '';
  for (let i = 0; i < 6; i++) s += CODE_ALPHABET[crypto.randomInt(CODE_ALPHABET.length)];
  return `IF-${s}`;
}

async function sendMail({ to, subject, text, html, replyTo }) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[orders:dev] mail to ${to}\n${subject}\n${text}`);
      return true;
    }
    return false;
  }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.ORDER_FROM_EMAIL || 'Beat Store <onboarding@resend.dev>',
      to: [to],
      subject,
      text,
      html,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });
  return res.ok;
}

export async function POST(request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: 'bad_request' }, { status: 400 });

  const name = String(body.name || '').trim().slice(0, 100);
  const email = String(body.email || '').trim().slice(0, 200);
  if (!name || !EMAIL_RE.test(email)) return NextResponse.json({ error: 'bad_contact' }, { status: 400 });

  const rawItems = Array.isArray(body.items) ? body.items : [];
  if (rawItems.length === 0 || rawItems.length > MAX_ITEMS) return NextResponse.json({ error: 'bad_items' }, { status: 400 });

  const seen = new Set();
  const items = [];
  for (const it of rawItems) {
    const beatId = String(it?.beatId || '');
    const licenseKey = String(it?.licenseKey || '');
    if (!beatId || !LIC[licenseKey]) return NextResponse.json({ error: 'bad_items' }, { status: 400 });
    const k = `${beatId}:${licenseKey}`;
    if (seen.has(k)) continue;
    seen.add(k);
    items.push({ beatId, licenseKey });
  }

  const beatIds = [...new Set(items.filter(i => !i.beatId.startsWith('shop-')).map(i => i.beatId))];
  const beats = beatIds.length
    ? await client.withConfig({ useCdn: false }).fetch(
        '*[_type == "beat" && _id in $ids]{ _id, title, status, visibility, prices }',
        { ids: beatIds },
      )
    : [];
  const byId = Object.fromEntries(beats.map(b => [b._id, b]));
  const vaultOk = isValidCookie((await cookies()).get(VAULT_COOKIE)?.value);

  const lines = [];
  for (const { beatId, licenseKey } of items) {
    const lic = LIC[licenseKey];
    if (beatId.startsWith('shop-')) {
      if (beatId !== `shop-${licenseKey}`) return NextResponse.json({ error: 'bad_items' }, { status: 400 });
      lines.push({ title: `${lic.name} (general license — beat to be agreed)`, licName: lic.name, price: lic.price });
      continue;
    }
    const beat = byId[beatId];
    const visible = beat && (beat.visibility === 'public' || (beat.visibility === 'vault' && vaultOk));
    if (!beat || beat.status === 'sold' || !visible) {
      return NextResponse.json({ error: 'unavailable' }, { status: 409 });
    }
    const custom = Number(beat.prices?.[licenseKey]);
    lines.push({ title: beat.title, licName: lic.name, price: Number.isFinite(custom) && custom > 0 ? custom : lic.price });
  }

  const total = lines.reduce((s, l) => s + l.price, 0);
  const orderCode = newOrderCode();
  const payUrl = PAY_URL;

  if (rateLimited(ip)) return NextResponse.json({ error: 'rate_limited' }, { status: 429 });

  const notifyTo = process.env.ORDER_NOTIFY_EMAIL;
  if (!notifyTo && process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'unavailable_service' }, { status: 503 });
  }

  const listText = lines.map(l => `  • ${l.title} — ${l.licName} — ${usd(l.price)}`).join('\n');
  const text = [
    `New order ${orderCode} — ${usd(total)} ${CURRENCY}`,
    '',
    `Customer: ${name} <${email}>`,
    '',
    listText,
    '',
    `Total: ${usd(total)} ${CURRENCY}`,
    '',
    `Expect a Revolut payment of ${usd(total)} (the customer types the amount and the note by hand — they were asked to put ${orderCode} in the note; if it is missing, match by amount, time and name).`,
    `Once the money lands: send the files to ${email}.`,
  ].join('\n');
  const html = `
    <h2>New order ${esc(orderCode)} — ${esc(usd(total))} ${CURRENCY}</h2>
    <p><b>Customer:</b> ${esc(name)} &lt;${esc(email)}&gt;</p>
    <ul>${lines.map(l => `<li>${esc(l.title)} — ${esc(l.licName)} — <b>${esc(usd(l.price))}</b></li>`).join('')}</ul>
    <p><b>Total: ${esc(usd(total))} ${CURRENCY}</b></p>
    <p>Expect a Revolut payment of <b>${esc(usd(total))}</b>. The customer types the amount and the note by hand — they were asked to put
    <b>${esc(orderCode)}</b> in the note; if it is missing, match by amount, time and name.</p>
    <p>Once the money lands: send the files to ${esc(email)}.</p>`;

  const sent = await sendMail({
    to: notifyTo || 'dev@localhost',
    subject: `New order ${orderCode} — ${usd(total)} — ${name}`,
    text,
    html,
    replyTo: email,
  });
  if (!sent) return NextResponse.json({ error: 'notify_failed' }, { status: 502 });

  if (process.env.ORDER_FROM_EMAIL) {
    sendMail({
      to: email,
      subject: `Your order ${orderCode} — complete the payment`,
      text: `Hi ${name},\n\nYour order ${orderCode} (${usd(total)} ${CURRENCY}) is reserved.\nPay on Revolut: ${payUrl}\nEnter the amount ${usd(total)} and put ${orderCode} in the note.\n\nOnce the payment is confirmed your files are sent to this address, usually within 24 hours.\n\n${listText}`,
      html: `<p>Hi ${esc(name)},</p><p>Your order <b>${esc(orderCode)}</b> (${esc(usd(total))} ${CURRENCY}) is reserved.</p><p><a href="${esc(payUrl)}">Pay on Revolut</a> — enter the amount <b>${esc(usd(total))}</b> and put <b>${esc(orderCode)}</b> in the note.</p><p>Once the payment is confirmed your files are sent to this address, usually within 24 hours.</p>`,
    }).catch(() => {});
  }

  return NextResponse.json({ orderCode, total, currency: CURRENCY, payUrl });
}
