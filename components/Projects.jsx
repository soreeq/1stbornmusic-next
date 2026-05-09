'use client';
import VideoSlider from './VideoSlider';
import BioSection from './BioSection';
import PhotoSlider from './PhotoSlider';
import BeatCard from './BeatCard';

export default function Projects({ beats, collections, onTabChange, onBuy }) {
  const featuredBeats = beats.filter(b => b.isFeatured);
  const hasCollections = collections?.length > 0;

  return (
    <div>
      <VideoSlider beats={beats} onTabChange={onTabChange} />
      <BioSection />

      <div className="section" style={{ borderTop: '1px solid #111', paddingBottom: 0, display: 'flex', justifyContent: 'center' }}>
        <PhotoSlider />
      </div>

      {hasCollections ? (
        collections.map(col => (
          <div key={col._id} className="section" style={{ paddingTop: 40, borderTop: '1px solid #111' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 6 }}>
              <div className="section-title">{col.title}</div>
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
          <div className="section-title">Featured Beats</div>
          <div className="section-sub">Top picks from the catalog</div>
          <div className="beats-grid">
            {featuredBeats.map((b, i) => <BeatCard key={b._id} beat={b} index={i} onBuy={onBuy} />)}
          </div>
        </div>
      )}
    </div>
  );
}