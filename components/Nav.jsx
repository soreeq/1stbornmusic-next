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

export default function Nav({ tab, setTab }) {
  const { items, setIsOpen } = useCart();
  const navRef = useRef(null);

  useEffect(() => {
    const update = () => {
      if (navRef.current) {
        document.documentElement.style.setProperty('--nav-h', `${navRef.current.offsetHeight}px`);
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <nav className="nav" ref={navRef}>
      <div className="nav-logo-row">
        <div style={{ width: '100%', cursor: 'pointer', position: 'relative' }} onClick={() => setTab('projects')}>
          <Image
            src="/logo.jpg"
            alt="1stBornMusic"
            width={1080}
            height={574}
            style={{ width: '100%', height: 'auto', display: 'block' }}
            priority
          />
        </div>
        <button className="cart-btn" onClick={() => setIsOpen(true)}>
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