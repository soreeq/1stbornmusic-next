'use client';
import { usePlayer } from '../contexts/PlayerContext';
import { IconPlay, IconPause, IconLoop, IconSkipB, IconSkipF, IconVol } from './Icons';

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
  const { currentBeat, isPlaying, isLooping, progress, duration, volume, togglePlay, handlePrev, handleNext, handleSeek, setIsLooping, setVolume } = usePlayer();

  return (
    <div className="player">
      <div className="player-beat-info">
        {currentBeat ? (
          <>
            <div className="player-thumb">{currentBeat.title.slice(0, 2).toUpperCase()}</div>
            <div>
              <div className="player-beat-name">{currentBeat.title}</div>
              <div className="player-beat-bpm">{currentBeat.bpm} BPM · {currentBeat.key}</div>
            </div>
          </>
        ) : (
          <div className="player-idle">Select a beat to play</div>
        )}
      </div>

      <div className="player-controls">
        <div className="player-btns">
          <button className="p-btn" onClick={handlePrev}><IconSkipB /></button>
          <button className="p-btn-play" onClick={togglePlay}>
            {isPlaying ? <IconPause /> : <IconPlay />}
          </button>
          <button className="p-btn" onClick={handleNext}><IconSkipF /></button>
          <button className={`p-btn ${isLooping ? 'active' : ''}`} onClick={() => setIsLooping(l => !l)} title="Loop">
            <IconLoop />
          </button>
        </div>
        {currentBeat && (
          <div className="player-progress">
            <span className="progress-time">{formatTime(progress, duration)}</span>
            <div className="progress-bar" onClick={e => { const r = e.currentTarget.getBoundingClientRect(); handleSeek(Math.max(0, Math.min(100, (e.clientX - r.left) / r.width * 100))); }}>
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <span className="progress-time right">{formatDur(duration)}</span>
          </div>
        )}
      </div>

      <div className="player-right">
        <IconVol />
        <input className="vol-slider" type="range" min="0" max="100" value={volume} onChange={e => setVolume(Number(e.target.value))} />
      </div>
    </div>
  );
}