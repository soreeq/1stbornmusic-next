'use client';
import BioSection from './BioSection';
import ChannelVideoSlider from './ChannelVideoSlider';
import PhotoSlider from './PhotoSlider';
import BeatCard from './BeatCard';
import VideoGrid from './VideoGrid';
import GlitchTitle from './GlitchTitle';
import { useCart } from '../contexts/CartContext';
import { LICENSES } from './LicenseModal';

const FAQ = [
  ['Can I use the beat commercially?', 'WAV Lease and above include commercial usage rights. MP3 Lease is for non-commercial projects only.'],
  ['How do I receive the files?', 'Immediately after purchase — download link sent to your email. All files delivered as ZIP.'],
  ["What if I want exclusivity later?", "Upgrade to Exclusive at any time. We subtract what you've already paid. DM us on Instagram."],
  ['Custom beats?', 'Yes — DM @1st_born313 on Instagram with your references and budget.'],
];

export default function Projects({ beats, collections, videos, channelVideos, onBuy }) {
  const featuredBeats = beats.filter(b => b.isFeatured);
  const hasCollections = collections?.length > 0;
  const { addToCart } = useCart();

  return (
    <div>
      <ChannelVideoSlider videos={channelVideos} />
      <BioSection />

      <div className="section" style={{ borderTop: '1px solid #111', paddingBottom: 0, display: 'flex', justifyContent: 'center' }}>
        <PhotoSlider />
      </div>

      {hasCollections ? (
        collections.map(col => (
          <div key={col._id} className="section" style={{ paddingTop: 40, borderTop: '1px solid #111' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 6 }}>
              <GlitchTitle>{col.title}</GlitchTitle>
              {col.beats?.length > 0 && (
                <span style={{ fontSize: 10, color: '#333', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  {col.beats.length} beats
                </span>
              )}
            </div>
            {col.description && (
              <div className="section-sub" style={{ marginBottom: 24 }}>{col.description}</div>
            )}
            {col.beats?.length > 0 ? (
              <div className="beats-grid">
                {col.beats.map((b, i) => <BeatCard key={b._id} beat={b} index={i} onBuy={onBuy} />)}
              </div>
            ) : (
              <div style={{ padding: '32px 0', color: '#2a2a2a', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                No beats in this collection yet
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="section" style={{ paddingTop: 40 }}>
          <GlitchTitle>Featured Beats</GlitchTitle>
          <div className="section-sub">Top picks from the catalog</div>
          <div className="beats-grid">
            {featuredBeats.map((b, i) => <BeatCard key={b._id} beat={b} index={i} onBuy={onBuy} />)}
          </div>
        </div>
      )}

      <VideoGrid videos={videos} />

      <div className="section" style={{ borderTop: '1px solid #111' }}>
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
        {FAQ.map(([q, a]) => (
          <div key={q} style={{ borderBottom: '1px solid var(--border)', paddingBottom: 20, marginBottom: 20 }}>
            <div style={{ fontWeight: 600, marginBottom: 6 }}>{q}</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{a}</div>
          </div>
        ))}
      </div>
    </div>
  );
}