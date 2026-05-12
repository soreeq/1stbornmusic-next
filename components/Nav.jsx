'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useCart } from '../contexts/CartContext';
import { IconBag } from './Icons';

const TABS = [
  { id: 'projects', label: 'Projects' },
  { id: 'beats',    label: 'All Beats' },
  { id: 'shop',     label: 'Shop' },
  { id: 'bio',      label: 'Bio' },
  { id: 'contact',  label: 'Contact' },
];

const LOGO_H = 280;

export default function Nav({ tab, setTab }) {
  const { items, setIsOpen } = useCart();
  const navRef = useRef(null);

  useEffect(() => {
    const onResize = () => {
      if (navRef.current) {
        document.documentElement.style.setProperty('--nav-h', `${navRef.current.offsetHeight}px`);
      }
    };
    window.addEventListener('resize', onResize);
    onResize();
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <nav className="nav nav-loaded" ref={navRef}>
      <div className="nav-logo-row" style={{ height: LOGO_H }}>
        <div style={{ position: 'absolute', inset: 0, cursor: 'pointer' }} onClick={() => setTab('projects')}>
          <Image
            src="/logo.png"
            alt="1stBornMusic"
            fill
            style={{ objectFit: 'contain', objectPosition: 'center' }}
            priority
          />
        </div>
        <button className="cart-btn" style={{ position: 'relative', zIndex: 1 }} onClick={() => setIsOpen(true)}>
          <IconBag /> Cart
          {items.length > 0 && <span className="cart-badge">{items.length}</span>}
        </button>
      </div>
      <div className="nav-tabs">
        {TABS.map(t => (
          <div key={t.id} className={`nav-tab ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>
            {t.label}
          </div>
        ))}
      </div>
    </nav>
  );
}