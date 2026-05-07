'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { usePlayer } from '../contexts/PlayerContext';

const YOUTUBE_IDS = ['0_8FtrLr1AE', 'Ewfj2DYzvbU', 'xqpCT9JEuMQ', 'DFSitiOrisY'];

export default function VideoSlider({ beats, onTabChange }) {
  const [current, setCurrent] = useState(0);
  const [muted, setMuted] = useState(true);
  const timerRef = useRef(null);
  const mutedRef = useRef(true);
  const { handlePlay } = usePlayer();

  const goTo = useCallback((idx) => {
    setCurrent(idx);
    if (mutedRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => setCurrent(c => (c + 1) % YOUTUBE_IDS.length), 10000);
    }
  }, []);

  useEffect(() => {
    mutedRef.current = muted;
    if (muted) {
      timerRef.current = setInterval(() => setCurrent(c => (c + 1) % YOUTUBE_IDS.length), 10000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [muted]);

  return (
    <div className="vslider">
      <div className="vslider-track" style={{ transform: `translateX(-${current * 100}%)` }}>
        {YOUTUBE_IDS.map((id, i) => {
          const isUnmuted = !muted && i === current;
          const muteParam = isUnmuted ? '' : '&mute=1';
          return (
            <div key={id + (isUnmuted ? 'u' : 'm')} className="vslider-frame">
              <iframe
                src={`https://www.youtube.com/embed/${id}?autoplay=1${muteParam}&rel=0&modestbranding=1&controls=0&loop=1&playlist=${id}`}
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          );
        })}
      </div>
      <div className="vslider-overlay" />
      <button
        onClick={() => setMuted(m => !m)}
        style={{ position: 'absolute', top: 16, right: 16, zIndex: 4, background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '6px 12px', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'inherit' }}
      >
        {muted ? '🔇 UNMUTE' : '🔊 MUTE'}
      </button>
      <div className="vslider-cta">
        <button className="btn btn-accent" onClick={() => onTabChange('beats')}>Browse All Beats</button>
        {beats.length > 0 && <button className="btn btn-outline" onClick={() => handlePlay(beats[0])}>Listen Now</button>}
      </div>
      <div className="vslider-dots">
        {YOUTUBE_IDS.map((_, i) => (
          <button key={i} className={`vslider-dot ${i === current ? 'active' : ''}`} onClick={() => goTo(i)} />
        ))}
      </div>
      <div className="vslider-arrows">
        <button className="vslider-arrow" onClick={() => goTo((current - 1 + YOUTUBE_IDS.length) % YOUTUBE_IDS.length)}>◀</button>
        <button className="vslider-arrow" onClick={() => goTo((current + 1) % YOUTUBE_IDS.length)}>▶</button>
      </div>
    </div>
  );
}