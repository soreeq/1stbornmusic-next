'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { PlayerProvider } from '../../contexts/PlayerContext';
import { CartProvider, useCart } from '../../contexts/CartContext';
import VaultDoor from './VaultDoor';
import VaultCodeForm from './VaultCodeForm';
import BeatCard from '../BeatCard';
import AudioPlayer from '../AudioPlayer';
import LicenseModal from '../LicenseModal';
import CartDrawer from '../CartDrawer';
import { IconBag } from '../Icons';

function VaultHeader() {
  const { items, setIsOpen } = useCart();
  return (
    <>
      <header className="nav-logo-section">
        <a href="/" style={{ position: 'absolute', inset: 0, cursor: 'pointer' }} aria-label="1stBornMusic — back to store">
          <Image
            src="/logo.png"
            alt="1stBornMusic"
            fill
            style={{ objectFit: 'contain', objectPosition: 'center' }}
            priority
          />
        </a>
        <button className="cart-btn" style={{ position: 'relative', zIndex: 1 }} onClick={() => setIsOpen(true)}>
          <IconBag /> Cart
          {items.length > 0 && <span className="cart-badge">{items.length}</span>}
        </button>
      </header>
      <nav className="nav nav-loaded">
        <a href="/" className="nav-tab">← Back to Store</a>
        <span className="nav-tab active" style={{ cursor: 'default' }}>The Vault</span>
      </nav>
    </>
  );
}

function VaultInner({ beats }) {
  const [modal, setModal] = useState(null);
  const { toast } = useCart();

  return (
    <>
      <VaultHeader />

      <main className="vault-main">
        <div className="vault-hero">
          <Image src="/vault-interior.jpg" alt="Inside the Vault — reserved stock" fill style={{ objectFit: 'cover' }} priority />
        </div>
        <div className="page-wrap">
          <div className="vault-inside-head">
            <div className="vault-eyebrow">
              <span className="vault-eyebrow-dot" />
              ACCESS GRANTED — RESERVED STOCK
            </div>
            <h1 className="vault-title">Inside the Vault</h1>
            <p className="vault-sub">
              {beats.length > 0
                ? `${beats.length} beat${beats.length > 1 ? 's' : ''} under lock. These never play in the open catalog — what you hear in here stays in here.`
                : 'The vault is being restocked. Check back soon — or DM @1st_born313.'}
            </p>
          </div>

          {beats.length > 0 && (
            <div className="beats-grid vault-grid">
              {beats.map((b, i) => <BeatCard key={b._id} beat={b} index={i} onBuy={setModal} />)}
            </div>
          )}
        </div>
      </main>

      <AudioPlayer />
      {modal && <LicenseModal beat={modal} onClose={() => setModal(null)} />}
      <CartDrawer />
      {toast && <div className="toast">{toast}</div>}
    </>
  );
}

function VaultGate() {
  return (
    <div className="vault-zone vault-gate">
      <VaultDoor state="closed" />
      <div className="vault-eyebrow" style={{ justifyContent: 'center' }}>
        <span className="vault-eyebrow-dot" />
        THIS AREA IS SEALED
      </div>
      <h1 className="vault-title">The Vault</h1>
      <p className="vault-sub" style={{ margin: '0 auto 28px', textAlign: 'center' }}>
        Reserved stock, code holders only. Scan your QR card or punch in the code.
      </p>
      <VaultCodeForm onUnlocked={() => window.location.reload()} />
      <a className="vault-header-back" href="/" style={{ marginTop: 32 }}>← Back to store</a>
    </div>
  );
}

export default function VaultExperience({ authorized, beats, keyToPersist }) {
  const [intro, setIntro] = useState(authorized); // door-opening overlay
  const [doorState, setDoorState] = useState('closed');

  useEffect(() => {
    if (!authorized) return;
    // came in via QR link — persist access in a cookie, then clean the key from the URL
    if (keyToPersist) {
      fetch('/api/vault', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: keyToPersist }),
      }).catch(() => {});
      window.history.replaceState(null, '', '/vault');
    }
    // play the door-opening intro once per session
    if (sessionStorage.getItem('vault_intro_seen')) {
      setIntro(false);
      return;
    }
    sessionStorage.setItem('vault_intro_seen', '1');
    const t1 = setTimeout(() => setDoorState('opening'), 450);
    const t2 = setTimeout(() => setIntro(false), 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [authorized, keyToPersist]);

  if (!authorized) return <VaultGate />;

  return (
    <div className="vault-zone">
      <PlayerProvider beats={beats}>
        <CartProvider>
          <VaultInner beats={beats} />
        </CartProvider>
      </PlayerProvider>

      {intro && (
        <div className={`vault-intro${doorState === 'opening' ? ' opening' : ''}`}>
          <VaultDoor state={doorState} />
        </div>
      )}
    </div>
  );
}
