'use client';
import { useEffect, useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { IconClose, IconTrash, IconBag } from './Icons';

const ORDER_ERRORS = {
  429: 'Too many orders from this connection. Try again in a few minutes.',
  409: 'One of the beats in your cart is no longer available. Remove it and try again.',
  400: 'Please check your name and email.',
};
const ORDER_FALLBACK_ERROR = 'Ordering is temporarily unavailable. DM @1st_born313 on Instagram and we will sort it out.';

export default function CartDrawer() {
  const { items, isOpen, removeFromCart, clearCart, setIsOpen } = useCart();
  const [step, setStep] = useState('cart');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [order, setOrder] = useState(null);
  const [qr, setQr] = useState('');
  const [copied, setCopied] = useState(false);
  const total = items.reduce((s, i) => s + i.price, 0);

  useEffect(() => {
    if (step !== 'pay' || !order?.payUrl) return;
    let alive = true;
    import('qrcode')
      .then(m => m.toDataURL(order.payUrl, { margin: 1, width: 220, color: { dark: '#0a0a0a', light: '#f4f1ec' } }))
      .then(url => { if (alive) setQr(url); })
      .catch(() => {});
    return () => { alive = false; };
  }, [step, order]);

  if (!isOpen) return null;

  const onClose = () => { setIsOpen(false); if (step !== 'pay') setStep('cart'); };

  const placeOrder = async () => {
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          items: items.map(i => ({ beatId: i.beat._id, licenseKey: i.licenseKey })),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(ORDER_ERRORS[res.status] || ORDER_FALLBACK_ERROR);
        return;
      }
      setOrder(data);
      setStep('pay');
    } catch {
      setError('Network error — check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const finish = () => {
    clearCart();
    setOrder(null);
    setQr('');
    setStep('cart');
    setIsOpen(false);
  };

  return (
    <>
      <div className="drawer-overlay" onClick={onClose} />
      <div className="drawer">
        <div className="drawer-header">
          <div className="drawer-title">
            {step === 'pay' ? 'Payment' : 'Cart'} {step !== 'pay' && items.length > 0 && <span style={{ color: 'var(--accent)' }}>({items.length})</span>}
          </div>
          <button className="modal-close" onClick={onClose}><IconClose /></button>
        </div>

        {step === 'cart' && (
          <>
            <div className="drawer-body">
              {items.length === 0 ? (
                <div className="drawer-empty">
                  <IconBag />
                  <span>Your cart is empty</span>
                </div>
              ) : (
                items.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-thumb">{item.beat.title.slice(0, 2).toUpperCase()}</div>
                    <div className="cart-item-info">
                      <div className="cart-item-title">{item.beat.title}</div>
                      <div className="cart-item-lic">{item.licName} · {item.beat.bpm} BPM · {item.beat.key}</div>
                    </div>
                    <div className="cart-item-price">${item.price}</div>
                    <button className="cart-item-remove" onClick={() => removeFromCart(item.id)}><IconTrash /></button>
                  </div>
                ))
              )}
            </div>
            {items.length > 0 && (
              <div className="drawer-footer">
                <div className="cart-total">
                  <span className="cart-total-label">Total</span>
                  <span className="cart-total-val">${total}</span>
                </div>
                <button className="btn btn-accent" style={{ width: '100%' }} onClick={() => setStep('checkout')}>Checkout →</button>
                <button className="btn btn-ghost btn-sm" style={{ width: '100%', textAlign: 'center', justifyContent: 'center' }} onClick={clearCart}>Clear Cart</button>
              </div>
            )}
          </>
        )}

        {step === 'checkout' && (
          <>
            <div className="drawer-body">
              <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 8 }}>Ordering {items.length} beat{items.length > 1 ? 's' : ''}:</div>
              {items.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--muted)', padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
                  <span>{item.beat.title} <span style={{ color: 'var(--bg4)', marginLeft: 4 }}>{item.licName}</span></span>
                  <span style={{ color: 'var(--accent)' }}>${item.price}</span>
                </div>
              ))}
              <div className="checkout-form" style={{ marginTop: 16 }}>
                <div className="form-group">
                  <label className="form-label">Your Name</label>
                  <input className="form-input" placeholder="First Last" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Email (your files are sent here)</label>
                  <input className="form-input" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
              </div>
              {error && <div style={{ marginTop: 14, fontSize: 12, color: 'var(--accent)', lineHeight: 1.6 }}>{error}</div>}
            </div>
            <div className="drawer-footer">
              <div className="cart-total">
                <span className="cart-total-label">Total</span>
                <span className="cart-total-val">${total}</span>
              </div>
              <button className="btn btn-accent" style={{ width: '100%' }} disabled={!name || !email || submitting} onClick={placeOrder}>
                {submitting ? 'Placing order…' : 'Place Order & Pay →'}
              </button>
              <button className="btn btn-ghost btn-sm" style={{ width: '100%', textAlign: 'center', justifyContent: 'center' }} onClick={() => setStep('cart')}>← Back to Cart</button>
            </div>
          </>
        )}

        {step === 'pay' && order && (
          <>
            <div className="drawer-body" style={{ alignItems: 'center', textAlign: 'center', gap: 14 }}>
              <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)' }}>Order received — not paid yet</div>
              <div style={{ width: '100%', border: '1px solid var(--border)', padding: '14px 12px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div>
                  <div style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)' }}>1 · Send exactly</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 26, color: '#fff' }}>${order.total} <span style={{ fontSize: 12, color: 'var(--muted)' }}>{order.currency}</span></div>
                </div>
                <div>
                  <div style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)' }}>2 · Put this in the payment note</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 20, letterSpacing: '0.12em', color: '#fff' }}>{order.orderCode}</div>
                  <button className="btn btn-ghost btn-sm" style={{ marginTop: 6 }} onClick={() => navigator.clipboard?.writeText(order.orderCode).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1800); }).catch(() => {})}>
                    {copied ? 'Copied ✓' : 'Copy code'}
                  </button>
                </div>
              </div>
              <a className="btn btn-accent" style={{ width: '100%', justifyContent: 'center' }} href={order.payUrl} target="_blank" rel="noreferrer">
                Open Revolut →
              </a>
              {qr && (
                <>
                  <div style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>or scan with your phone</div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={qr} alt="Revolut payment QR code" width={160} height={160} style={{ border: '1px solid var(--border)' }} />
                </>
              )}
              <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.7 }}>
                Revolut asks you to type the amount yourself. Payments are confirmed by hand — your files are emailed to <strong style={{ color: 'var(--text)' }}>{email}</strong>, usually within 24 hours.
              </div>
            </div>
            <div className="drawer-footer">
              <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }} onClick={finish}>I&apos;ve paid — Done</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
