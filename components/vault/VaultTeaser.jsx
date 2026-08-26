'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import VaultDoor from './VaultDoor';
import VaultCodeForm from './VaultCodeForm';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function VaultTeaser() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [ref, visible] = useScrollReveal(0.12);

  useEffect(() => {
    fetch('/api/vault')
      .then(r => r.json())
      .then(d => setAuthorized(!!d.authorized))
      .catch(() => {});
  }, []);

  return (
    <section ref={ref} className={`vault-zone vault-teaser scroll-reveal ${visible ? 'visible' : ''}`}>
      <div className="vault-teaser-door" onClick={() => authorized && router.push('/vault')} style={authorized ? { cursor: 'pointer' } : undefined}>
        <VaultDoor state="closed" />
      </div>

      <div className="vault-teaser-copy">
        <div className="vault-eyebrow">
          <span className="vault-eyebrow-dot" />
          RESTRICTED ACCESS — FILE NO. 313
        </div>
        <h2 className="vault-title">The Vault</h2>
        <p className="vault-sub">
          A private reserve of top-shelf instrumentals — sealed off from the public catalog.
          Heard only by those who hold the code. Once a beat goes in the vault, it never plays in the open.
        </p>

        {authorized ? (
          <button className="vault-enter-btn" onClick={() => router.push('/vault')}>
            DOOR UNLOCKED — ENTER THE VAULT →
          </button>
        ) : (
          <VaultCodeForm onUnlocked={() => router.push('/vault')} />
        )}

        <div className="vault-hint">
          <svg className="vault-hint-qr" viewBox="0 0 21 21" aria-hidden="true">
            {/* decorative QR-style glyph */}
            <rect x="0" y="0" width="7" height="7" /><rect x="2" y="2" width="3" height="3" fill="var(--bg)" />
            <rect x="14" y="0" width="7" height="7" /><rect x="16" y="2" width="3" height="3" fill="var(--bg)" />
            <rect x="0" y="14" width="7" height="7" /><rect x="2" y="16" width="3" height="3" fill="var(--bg)" />
            <rect x="9" y="0" width="2" height="2" /><rect x="9" y="4" width="2" height="3" />
            <rect x="14" y="9" width="3" height="2" /><rect x="19" y="9" width="2" height="2" />
            <rect x="9" y="9" width="3" height="3" /><rect x="0" y="9" width="2" height="2" />
            <rect x="4" y="9" width="3" height="2" /><rect x="9" y="14" width="2" height="3" />
            <rect x="13" y="13" width="2" height="2" /><rect x="16" y="14" width="2" height="2" />
            <rect x="14" y="18" width="3" height="2" /><rect x="19" y="17" width="2" height="4" />
          </svg>
          <span>
            Got a card? <strong>Scan the QR</strong> and the door opens itself.<br />
            Codes are handed out by 1stBorn himself — <a href="https://www.instagram.com/1st_born313" target="_blank" rel="noreferrer">DM @1st_born313</a>.
          </span>
        </div>
      </div>
    </section>
  );
}
