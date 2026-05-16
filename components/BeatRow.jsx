'use client';
import { useMemo } from 'react';
import { usePlayer } from '../contexts/PlayerContext';

function wavBars(seed, count = 48) {
  const bars = [];
  let s = seed * 9301 + 49297;
  for (let i = 0; i < count; i++) {
    s = (s * 9301 + 49297) % 233280;
    const r = s / 233280;
    const env = Math.sin((i / count) * Math.PI);
    const h = Math.max(3, Math.round((r * 0.7 + env * 0.5) * 28));
    bars.push(h);
  }
  return bars;
}

export default function BeatRow({ beat, index, onBuy }) {
  const { currentBeat, isPlaying, handlePlay } = usePlayer();
  const active  = currentBeat?._id === beat._id;
  const playing = active && isPlaying;
  const sold    = beat.status === 'sold';
  const bars    = useMemo(() => wavBars(index + 1), [index]);

  return (
    <div className={`ab-beat-row${playing ? ' playing' : ''}${sold ? ' sold' : ''}`}>
      {playing && <span className="ab-row-indicator" />}

      <button
        className={`ab-row-play${playing ? ' playing' : ''}`}
        onClick={() => !sold && handlePlay(beat)}
        aria-label={playing ? 'Pause' : `Play ${beat.title}`}
        disabled={sold}
      >
        {playing ? '❚❚' : '▶'}
      </button>

      <div className="ab-row-title">
        <span className="ab-row-name">
          {String(index + 1).padStart(2, '0')} · {beat.title}
        </span>
        <div className="ab-row-tags">
          {beat.isNew && <span className="ab-tag ab-tag-new">NEW</span>}
          {sold        && <span className="ab-tag ab-tag-sold">SOLD</span>}
          {beat.tags?.map(t => <span key={t} className="ab-tag">{t}</span>)}
        </div>
      </div>

      <div className="ab-row-bpm"><strong>{beat.bpm}</strong> bpm</div>
      <div className="ab-row-key"><strong>{beat.key}</strong></div>

      <div className="ab-row-waveform" aria-hidden="true">
        {bars.map((h, i) => (
          <i key={i} className={`ab-wv-bar${i < 16 ? ' head' : ''}`} style={{ height: h }} />
        ))}
      </div>

      <div className="ab-row-dur">{beat.duration ?? '—'}</div>

      <div className="ab-row-price">
        ${beat.prices?.mp3 ?? 29}
        <small>License</small>
      </div>

      <div className="ab-row-actions">
        {sold ? (
          <span className="ab-icon-btn" style={{ opacity: 0.3, cursor: 'default' }}>✓</span>
        ) : (
          <>
            <button className="ab-icon-btn" onClick={() => onBuy(beat)} title="License options">♡</button>
            <button className="ab-icon-btn ab-cart-btn" onClick={() => onBuy(beat)}>+ Cart</button>
          </>
        )}
      </div>
    </div>
  );
}