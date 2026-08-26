import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { VAULT_COOKIE, isValidCode, isValidCookie, accessCookieValue } from '../../../lib/vault';

export async function GET() {
  const store = await cookies();
  const authorized = isValidCookie(store.get(VAULT_COOKIE)?.value);
  return NextResponse.json({ authorized });
}

export async function POST(request) {
  const { code } = await request.json().catch(() => ({}));
  if (!isValidCode(code)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(VAULT_COOKIE, accessCookieValue(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
  });
  return res;
}
