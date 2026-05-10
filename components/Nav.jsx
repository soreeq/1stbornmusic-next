'use client';
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

  return (
    <nav className="nav">
      <div className="nav-logo-row">
        <div style={{ position: 'absolute', inset: 0, cursor: 'pointer' }} onClick={() => setTab('projects')}>
          <Image src="/logo.jpg" alt="1stBornMusic" fill style={{ objectFit: 'contain', objectPosition: 'center' }} priority />
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