'use client';
import { usePlayer } from '../contexts/PlayerContext';
import { IconPlay, IconPause, IconCart } from './Icons';

function fmtPlays(n) { return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n; }

export default function BeatCard({ beat, index, onBuy }) {
  const { currentBeat, isPlaying, handlePlay } = usePlayer();
  const active = currentBeat?._id === beat._id;

  return (
    <div className={`beat-card ${active ? 'playing' : ''}`}>
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
        <button className="btn btn-sm btn-outline" onClick={() => onBuy(beat)}>
          <IconCart /> License
        </button>
        <span className="beat-price">${beat.prices?.mp3 ?? 29}</span>
      </div>
    </div>
  );
}