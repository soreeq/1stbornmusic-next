'use client';
import { usePlayer } from '../contexts/PlayerContext';

export default function AllBeatCard({ beat, index, onBuy }) {
  const { currentBeat, isPlaying, handlePlay } = usePlayer();
  const active  = currentBeat?._id === beat._id;
  const playing = active && isPlaying;
  const sold    = beat.status === 'sold';

  return (
    <div className={`ab-card${playing ? ' playing' : ''}`}>
      <div className="ab-card-cover">
        <span className="ab-card-num">{String(index + 1).padStart(2, '0')} / ∞</span>
        <span className="ab-card-name">{beat.title}</span>
        {!sold && (
          <div className="ab-card-overlay">
            <button
              className="ab-card-play-btn"
              onClick={() => handlePlay(beat)}
              aria-label={playing ? 'Pause' : `Play ${beat.title}`}
            >
              {playing ? '❚❚' : '▶'}
            </button>
          </div>
        )}
      </div>

      <div className="ab-card-meta">
        <span>{beat.bpm} BPM · {beat.key}</span>
        {beat.duration && <span>{beat.duration}</span>}
      </div>

      <div className="ab-card-meta">
        <span className="ab-card-price">${beat.prices?.mp3 ?? 29}</span>
        {sold ? (
          <span className="ab-tag ab-tag-sold">SOLD</span>
        ) : (
          <button className="ab-icon-btn ab-cart-btn" onClick={() => onBuy(beat)}>
            + Cart
          </button>
        )}
      </div>
    </div>
  );
}