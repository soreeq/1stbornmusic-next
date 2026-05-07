'use client';
import { usePlayer } from '../contexts/PlayerContext';
import { IconPlay, IconPause, IconCart } from './Icons';

export default function BeatRow({ beat, index, onBuy }) {
  const { currentBeat, isPlaying, handlePlay } = usePlayer();
  const active = currentBeat?._id === beat._id;

  return (
    <div className={`beat-row ${active ? 'playing' : ''}`}>
      <div className="beat-row-num">
        {active && isPlaying
          ? <button className="play-btn active" style={{ width: 24, height: 24, border: 'none' }} onClick={() => handlePlay(beat)}><IconPause /></button>
          : <span style={{ cursor: 'pointer' }} onClick={() => handlePlay(beat)}>{index + 1}</span>}
      </div>
      <div className="beat-row-info">
        <div className="beat-row-title">{beat.title}</div>
        <div className="beat-row-meta">
          <span>{beat.bpm} BPM</span>
          <span>{beat.key}</span>
          {beat.isNew && <span style={{ color: 'var(--accent)' }}>NEW</span>}
        </div>
      </div>
      <div className="beat-row-tags">
        {beat.tags?.map(t => <span key={t} className="beat-tag">{t}</span>)}
      </div>
      <div className="beat-row-actions">
        <button className="btn btn-sm btn-outline" onClick={() => onBuy(beat)}><IconCart /></button>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)', minWidth: 32 }}>${beat.prices?.mp3 ?? 29}</span>
      </div>
    </div>
  );
}