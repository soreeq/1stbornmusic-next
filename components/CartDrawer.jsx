'use client';
import { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { IconClose, IconTrash, IconBag } from './Icons';

export default function CartDrawer() {
  const { items, isOpen, removeFromCart, clearCart, setIsOpen } = useCart();
  const [step, setStep] = useState('cart');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const total = items.reduce((s, i) => s + i.price, 0);

  if (!isOpen) return null;

  const onClose = () => { setIsOpen(false); setStep('cart'); };

  return (
    <>
      <div className="drawer-overlay" onClick={onClose} />
      <div className="drawer">
        <div className="drawer-header">
          <div className="drawer-title">Cart {items.length > 0 && <span style={{ color: 'var(--accent)' }}>({items.length})</span>}</div>
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
                  <label className="form-label">Email</label>
                  <input className="form-input" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="drawer-footer">
              <div className="cart-total">
                <span className="cart-total-label">Total</span>
                <span className="cart-total-val">${total}</span>
              </div>
              <button className="btn btn-accent" style={{ width: '100%' }} disabled={!name || !email} onClick={() => setStep('success')}>Place Order</button>
              <button className="btn btn-ghost btn-sm" style={{ width: '100%', textAlign: 'center', justifyContent: 'center' }} onClick={() => setStep('cart')}>← Back to Cart</button>
            </div>
          </>
        )}

        {step === 'success' && (
          <div className="drawer-body" style={{ justifyContent: 'center' }}>
            <div className="checkout-success">
              <div className="checkout-success-icon">✓</div>
              <div className="checkout-success-title">Order Placed!</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 8, lineHeight: 1.7 }}>
                Confirmation sent to <strong style={{ color: 'var(--text)' }}>{email}</strong>.<br />
                Files delivered within 24 hours.
              </div>
              <button className="btn btn-outline" style={{ marginTop: 24 }} onClick={() => { clearCart(); onClose(); }}>Done</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}