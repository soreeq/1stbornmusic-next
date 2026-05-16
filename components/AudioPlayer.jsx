'use client';
import { useEffect, useRef, useState } from 'react';
import { usePlayer } from '../contexts/PlayerContext';
import { IconLoop } from './Icons';
import LicenseModal from './LicenseModal';

function formatTime(pct, durSec) {
  if (!durSec) return '0:00';
  const elapsed = Math.floor(durSec * pct / 100);
  return `${Math.floor(elapsed / 60)}:${String(elapsed % 60).padStart(2, '0')}`;
}
function formatDur(sec) {
  if (!sec) return '--:--';
  return `${Math.floor(sec / 60)}:${String(Math.floor(sec % 60)).padStart(2, '0')}`;
}

export default function AudioPlayer() {
  const {
    currentBeat, isPlaying, isLooping, progress, duration, volume,
    togglePlay, handlePrev, handleNext, handleSeek, setIsLooping, setVolume,
  } = usePlayer();

  const thumbRef    = useRef(null);
  const prevBeatId  = useRef(null);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (currentBeat && currentBeat._id !== prevBeatId.current) {
      prevBeatId.current = currentBeat._id;
      const el = thumbRef.current;
      if (!el) return;
      el.classList.remove('pulse');
      void el.offsetWidth;
      el.classList.add('pulse');
    }
  }, [currentBeat]);

  return (
    <>
      <div className={`player ap${currentBeat ? ' ap-active' : ''}`}>

        {/* ── NOW PLAYING ── */}
        <div className="ap-now">
          <div
            ref={thumbRef}
            className="ap-thumb"
            onAnimationEnd={e => e.currentTarget.classList.remove('pulse')}
          />
          <div className="ap-info">
            {currentBeat ? (
              <>
                <span className="ap-title">{currentBeat.title}</span>
                <span className="ap-sub">
                  {[currentBeat.bpm && `${currentBeat.bpm} BPM`, currentBeat.key].filter(Boolean).join(' · ')}
                </span>
              </>
            ) : (
              <span className="ap-idle">Select a beat to play</span>
            )}
          </div>
        </div>

        {/* ── CONTROLS + SCRUB ── */}
        <div className="ap-center">
          <div className="ap-btns">
            <button className="ap-skip" onClick={handlePrev} aria-label="Previous">⏮</button>
            <button className="ap-play-main" onClick={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}>
              {isPlaying ? '❚❚' : '▶'}
            </button>
            <button className="ap-skip" onClick={handleNext} aria-label="Next">⏭</button>
            <button
              className={`ap-loop${isLooping ? ' active' : ''}`}
              onClick={() => setIsLooping(l => !l)}
              title="Loop"
            >
              <IconLoop />
            </button>
          </div>

          <div className="ap-scrub">
            <span className="ap-time">{formatTime(progress, duration)}</span>
            <div
              className="ap-bar"
              onClick={e => {
                const r = e.currentTarget.getBoundingClientRect();
                handleSeek(Math.max(0, Math.min(100, (e.clientX - r.left) / r.width * 100)));
              }}
            >
              <div className="ap-fill" style={{ width: `${progress}%` }} />
            </div>
            <span className="ap-time">{formatDur(duration)}</span>
          </div>
        </div>

        {/* ── RIGHT: VOLUME + PRICE + CART ── */}
        <div className="ap-right">
          <div className="ap-vol-wrap">
            <span className="ap-vol-icon">🔊</span>
            <input
              className="ap-vol-slider"
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={e => setVolume(Number(e.target.value))}
              aria-label="Volume"
            />
          </div>
          {currentBeat && (
            <>
              <span className="ap-price">${currentBeat.prices?.mp3 ?? 29}</span>
              <button className="ap-cart-btn" onClick={() => setModal(true)}>+ Cart</button>
            </>
          )}
        </div>

      </div>

      {modal && currentBeat && (
        <LicenseModal beat={currentBeat} onClose={() => setModal(false)} />
      )}
    </>
  );
}