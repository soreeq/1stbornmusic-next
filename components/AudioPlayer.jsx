'use client';
import { useEffect, useRef, useState } from 'react';
import { usePlayer } from '../contexts/PlayerContext';
import { IconLoop, IconBag, IconPlay, IconPause, IconSkipB, IconSkipF } from './Icons';
import LicenseModal from './LicenseModal';
import Waveform from './Waveform';

const BAR_H = 76;
const WAVE_H = 58;

export default function AudioPlayer() {
  const {
    currentBeat, isPlaying, isLooping, progress, duration, volume, audioRef,
    togglePlay, handlePrev, handleNext, handleSeek, setIsLooping, setVolume,
  } = usePlayer();

  const thumbRef    = useRef(null);
  const prevBeatId  = useRef(null);
  const [modal, setModal] = useState(false);
  const active = !!currentBeat;

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

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--player-h', `${active ? BAR_H + WAVE_H : BAR_H}px`);
    return () => root.style.removeProperty('--player-h');
  }, [active]);

  const sold = currentBeat?.status === 'sold';

  return (
    <>
      <div className={`player ap${active ? ' ap-active' : ''}`}>

        {/* ── WAVEFORM STRIP ── */}
        {active && (
          <Waveform
            key={currentBeat._id}
            peaks={currentBeat.waveform}
            seed={currentBeat._id}
            progress={progress}
            duration={duration}
            isPlaying={isPlaying}
            audioRef={audioRef}
            onSeek={handleSeek}
          />
        )}

        <div className="ap-bar-row">

          {/* ── NOW PLAYING ── */}
          <div className="ap-now">
            <div
              ref={thumbRef}
              className="ap-thumb"
              onAnimationEnd={e => e.currentTarget.classList.remove('pulse')}
            >
              {currentBeat?.thumbnail && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={`${currentBeat.thumbnail}?w=96&h=96&fit=max&auto=format`} alt="" />
              )}
            </div>
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

          {/* ── TRANSPORT ── */}
          <div className="ap-center">
            <div className="ap-btns">
              <button className="ap-skip" onClick={handlePrev} aria-label="Previous beat"><IconSkipB /></button>
              <button className={`ap-play-main${isPlaying ? '' : ' is-play'}`} onClick={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}>
                {isPlaying ? <IconPause /> : <IconPlay />}
              </button>
              <button className="ap-skip" onClick={handleNext} aria-label="Next beat"><IconSkipF /></button>
            </div>
          </div>

          {/* ── LOOP + VOLUME + BUY ── */}
          <div className="ap-right">
            <button
              className={`ap-loop${isLooping ? ' active' : ''}`}
              onClick={() => setIsLooping(l => !l)}
              aria-pressed={isLooping}
              title="Loop"
            >
              <IconLoop /> <span className="ap-loop-label">Loop</span>
            </button>
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
              sold ? (
                <span className="ap-sold">Licensed</span>
              ) : (
                <button className="ap-cart-btn" onClick={() => setModal(true)}>
                  <IconBag /> ${currentBeat.prices?.mp3 ?? 29}
                </button>
              )
            )}
          </div>

        </div>
      </div>

      {modal && currentBeat && (
        <LicenseModal beat={currentBeat} onClose={() => setModal(false)} />
      )}
    </>
  );
}
