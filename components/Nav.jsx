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
        <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', cursor: 'pointer' }} onClick={() => setTab('projects')}>
          <Image src="/logo_1stborn.jpg" alt="1stBornMusic" width={200} height={96} style={{ height: 'clamp(56px,8vw,96px)', width: 'auto', display: 'block' }} priority />
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