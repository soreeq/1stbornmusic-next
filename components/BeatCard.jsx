'use client';
import { usePlayer } from '../contexts/PlayerContext';
import { IconPlay, IconPause, IconCart } from './Icons';
import { useScrollReveal } from '../hooks/useScrollReveal';

function fmtPlays(n) { return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n; }

const soldStampStyle = {
  position: 'absolute', top: 12, right: 12,
  border: '3px solid #c0392b', borderRadius: 4,
  color: '#c0392b', fontSize: 11, fontWeight: 900,
  letterSpacing: '0.18em', padding: '3px 8px',
  transform: 'rotate(-18deg)', opacity: 0.92,
  fontFamily: "'IM Fell English', serif",
  textTransform: 'uppercase', pointerEvents: 'none',
  boxShadow: '0 0 0 1px rgba(192,57,43,0.3)',
  background: 'rgba(0,0,0,0.6)',
};

export default function BeatCard({ beat, index, onBuy }) {
  const { currentBeat, isPlaying, handlePlay } = usePlayer();
  const [ref, visible] = useScrollReveal(0.08);
  const active = currentBeat?._id === beat._id;
  const sold = beat.status === 'sold';
  const delay = (index % 4) * 70;

  return (
    <div
      ref={ref}
      className={`beat-card scroll-reveal ${visible ? 'visible' : ''} ${active ? 'playing' : ''}`}
      style={{ position: 'relative', transitionDelay: `${delay}ms` }}
    >
      {sold && <div style={soldStampStyle}>SOLD</div>}
      <div className="beat-num">#{String(index + 1).padStart(2, '0')} · {fmtPlays(beat.plays)} plays</div>
      <div className="beat-title">{beat.title}</div>
      <div className="beat-meta">
        <span>{beat.bpm} BPM</span>
        <span>{beat.key}</span>
      </div>
      <div>
        {beat.isNew && <span className="beat-tag new">NEW</span>}
        {beat.tags?.map(t => <span key={t} className="beat-tag">{t}</span>)}
      </div>
      <div className="beat-actions">
        <button className={`play-btn ${active && isPlaying ? 'active' : ''}`} onClick={() => handlePlay(beat)}>
          {active && isPlaying ? <IconPause /> : <IconPlay />}
        </button>
        {sold ? (
          <span className="btn btn-sm btn-ghost" style={{ cursor: 'default', opacity: 0.4 }}>
            <IconCart /> Licensed
          </span>
        ) : (
          <button className="btn btn-sm btn-outline" onClick={() => onBuy(beat)}>
            <IconCart /> License
          </button>
        )}
        <span className="beat-price" style={{ opacity: sold ? 0.35 : 1 }}>${beat.prices?.mp3 ?? 29}</span>
      </div>
    </div>
  );
}