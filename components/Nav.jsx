'use client';
import { useEffect, useRef, useState } from 'react';
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

const LOGO_MAX = 280;
const LOGO_MIN = 90;
const SCROLL_RANGE = 250;

export default function Nav({ tab, setTab }) {
  const { items, setIsOpen } = useCart();
  const navRef = useRef(null);
  const [logoH, setLogoH] = useState(LOGO_MAX);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const progress = Math.min(window.scrollY / SCROLL_RANGE, 1);
      const h = Math.round(LOGO_MAX - progress * (LOGO_MAX - LOGO_MIN));
      setLogoH(h);
      document.documentElement.style.setProperty('--nav-h', `${h + 42}px`);
    };
    const onResize = () => {
      if (navRef.current) {
        document.documentElement.style.setProperty('--nav-h', `${navRef.current.offsetHeight}px`);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    onResize();
    setTimeout(() => setLoaded(true), 60);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    if (navRef.current) {
      document.documentElement.style.setProperty('--nav-h', `${navRef.current.offsetHeight}px`);
    }
  }, [logoH]);

  return (
    <nav className={`nav ${loaded ? 'nav-loaded' : ''}`} ref={navRef}>
      <div className="nav-logo-row" style={{ height: logoH }}>
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