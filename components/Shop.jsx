'use client';
import { useCart } from '../contexts/CartContext';
import { LICENSES } from './LicenseModal';

export default function Shop() {
  const { addToCart } = useCart();

  return (
    <div>
      <div className="section">
        <div className="section-title">License Store</div>
        <div className="section-sub">Choose the right license for your project. All licenses include instant delivery.</div>
        <div className="shop-grid">
          {LICENSES.map((lic, i) => (
            <div key={lic.key} className={`license-card ${i === 2 ? 'featured' : ''}`}>
              <div className="lic-icon">{lic.icon}</div>
              <div className="lic-name">{lic.name}</div>
              <div className="lic-price">${lic.price}<span> /beat</span></div>
              <ul className="lic-features">
                {lic.features.map(f => <li key={f}>{f}</li>)}
              </ul>
              <button className="btn btn-accent" style={{ width: '100%' }} onClick={() => addToCart({ _id: `shop-${lic.key}`, title: lic.name, bpm: '—', key: '—', prices: {} }, lic)}>
                Select {lic.name}
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="section" style={{ paddingTop: 0, borderTop: '1px solid var(--border)' }}>
        <div className="section-title" style={{ fontSize: 22 }}>Frequently Asked</div>
        {[
          ['Can I use the beat commercially?', 'WAV Lease and above include commercial usage rights. MP3 Lease is for non-commercial projects only.'],
          ['How do I receive the files?', 'Immediately after purchase — download link sent to your email. All files delivered as ZIP.'],
          ["What if I want exclusivity later?", "Upgrade to Exclusive at any time. We subtract what you've already paid. DM us on Instagram."],
          ['Custom beats?', 'Yes — DM @1st_born313 on Instagram with your references and budget.'],
        ].map(([q, a]) => (
          <div key={q} style={{ borderBottom: '1px solid var(--border)', paddingBottom: 20, marginBottom: 20 }}>
            <div style={{ fontWeight: 600, marginBottom: 6 }}>{q}</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{a}</div>
          </div>
        ))}
      </div>
    </div>
  );
}