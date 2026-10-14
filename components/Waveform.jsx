'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const BAR = 3;
const GAP = 2;
const H = 40;
const POINTS = 240;

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const fmt = sec => {
  if (!Number.isFinite(sec) || sec < 0) return '0:00';
  return `${Math.floor(sec / 60)}:${String(Math.floor(sec % 60)).padStart(2, '0')}`;
};

// Stand-in for beats whose real waveform has not been generated yet.
function pseudoPeaks(seed = '') {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  let s = (h >>> 0) % 233280;
  return Array.from({ length: POINTS }, (_, i) => {
    s = (s * 9301 + 49297) % 233280;
    const r = s / 233280;
    const env = Math.sin((i / POINTS) * Math.PI);
    return Math.round(18 + 72 * (r * 0.75 + env * 0.25));
  });
}

function resample(peaks, count) {
  const out = new Array(count);
  for (let i = 0; i < count; i++) {
    const a = Math.floor((i / count) * peaks.length);
    const b = Math.max(a + 1, Math.floor(((i + 1) / count) * peaks.length));
    let m = 0;
    for (let j = a; j < b && j < peaks.length; j++) if (peaks[j] > m) m = peaks[j];
    out[i] = m;
  }
  return out;
}

export default function Waveform({ peaks, seed, progress, duration, isPlaying, audioRef, onSeek }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const draggingRef = useRef(false);
  const [width, setWidth] = useState(0);
  const [hover, setHover] = useState(null);
  const [elapsed, setElapsed] = useState(0);

  const data = useMemo(() => (peaks?.length ? peaks : pseudoPeaks(seed)), [peaks, seed]);
  const live = useRef({});
  live.current = { data, width, hover, progress };

  const draw = useCallback(pct => {
    const canvas = canvasRef.current;
    const { data: d, width: w, hover: hv } = live.current;
    if (!canvas || !w) return;
    const dpr = window.devicePixelRatio || 1;
    if (canvas.width !== Math.round(w * dpr)) {
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(H * dpr);
    }
    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, H);
    const count = Math.max(1, Math.floor((w + GAP) / (BAR + GAP)));
    const bars = resample(d, count);
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#D92B3A';
    for (let i = 0; i < count; i++) {
      const bh = Math.max(3, (bars[i] / 100) * (H - 4));
      const x = i * (BAR + GAP);
      const frac = (i + 0.5) / count;
      ctx.fillStyle = frac <= pct ? accent : hv != null && frac <= hv ? '#6b5a55' : '#2f2a28';
      ctx.fillRect(x, (H - bh) / 2, BAR, bh);
    }
    const px = clamp(pct * w, 1, w - 1);
    ctx.fillStyle = '#f4f1ec';
    ctx.fillRect(px - 1, 0, 2, H);
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setWidth(Math.floor(el.clientWidth)));
    ro.observe(el);
    setWidth(Math.floor(el.clientWidth));
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    draw(clamp(progress / 100, 0, 1));
    setElapsed(Math.floor((progress / 100) * duration));
  }, [draw, data, width, hover, progress, duration]);

  useEffect(() => {
    if (!isPlaying) return;
    let id;
    const tick = () => {
      const a = audioRef.current;
      if (a && a.duration) {
        draw(clamp(a.currentTime / a.duration, 0, 1));
        const s = Math.floor(a.currentTime);
        setElapsed(prev => (prev === s ? prev : s));
      }
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [isPlaying, draw, audioRef]);

  const pctFrom = e => {
    const r = wrapRef.current.getBoundingClientRect();
    return clamp((e.clientX - r.left) / r.width, 0, 1);
  };

  const onPointerDown = e => {
    draggingRef.current = true;
    wrapRef.current.setPointerCapture(e.pointerId);
    onSeek(pctFrom(e) * 100);
  };
  const onPointerMove = e => {
    const p = pctFrom(e);
    setHover(p);
    if (draggingRef.current) onSeek(p * 100);
  };
  const onPointerUp = () => { draggingRef.current = false; };
  const onKeyDown = e => {
    if (!duration || (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight')) return;
    e.preventDefault();
    const step = (5 / duration) * 100 * (e.key === 'ArrowLeft' ? -1 : 1);
    onSeek(clamp(progress + step, 0, 100));
  };

  return (
    <div className="ap-wave-row">
      <span className="ap-time">{fmt(elapsed)}</span>
      <div
        ref={wrapRef}
        className="ap-wave"
        role="slider"
        tabIndex={0}
        aria-label="Seek"
        aria-valuemin={0}
        aria-valuemax={Math.floor(duration) || 0}
        aria-valuenow={elapsed}
        aria-valuetext={`${fmt(elapsed)} of ${fmt(duration)}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onPointerLeave={() => { if (!draggingRef.current) setHover(null); }}
        onKeyDown={onKeyDown}
      >
        <canvas ref={canvasRef} />
        {hover != null && duration > 0 && (
          <div className="ap-wave-tip" style={{ left: `${hover * 100}%` }}>{fmt(hover * duration)}</div>
        )}
      </div>
      <span className="ap-time ap-time-end">{duration ? fmt(duration) : '--:--'}</span>
    </div>
  );
}
