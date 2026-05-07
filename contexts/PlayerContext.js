'use client';
import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

const PlayerContext = createContext(null);

export function PlayerProvider({ beats, children }) {
  const [currentBeat, setCurrentBeat] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);

  const audioRef = useRef(null);
  const loadedSrcRef = useRef(null);
  const currentBeatRef = useRef(null);
  const isLoopingRef = useRef(false);

  useEffect(() => {
    const audio = new Audio();
    audio.volume = 0.8;
    audioRef.current = audio;

    const onMeta = () => setDuration(audio.duration || 0);
    const onTime = () => { if (audio.duration) setProgress((audio.currentTime / audio.duration) * 100); };
    const onEnd = () => {
      if (isLoopingRef.current) { audio.currentTime = 0; audio.play().catch(() => {}); return; }
      const idx = beats.findIndex(b => b._id === currentBeatRef.current?._id);
      if (idx >= 0 && idx < beats.length - 1) {
        setCurrentBeat(beats[idx + 1]);
        setProgress(0);
      } else {
        setIsPlaying(false);
        setProgress(0);
      }
    };
    audio.addEventListener('loadedmetadata', onMeta);
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('ended', onEnd);
    return () => {
      audio.pause();
      audio.removeEventListener('loadedmetadata', onMeta);
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('ended', onEnd);
    };
  }, [beats]);

  useEffect(() => { currentBeatRef.current = currentBeat; }, [currentBeat]);
  useEffect(() => { isLoopingRef.current = isLooping; if (audioRef.current) audioRef.current.loop = isLooping; }, [isLooping]);
  useEffect(() => { if (audioRef.current) audioRef.current.volume = volume / 100; }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentBeat?.audioSrc) { audio?.pause(); return; }
    if (loadedSrcRef.current !== currentBeat.audioSrc) {
      loadedSrcRef.current = currentBeat.audioSrc;
      audio.src = currentBeat.audioSrc;
      setDuration(0);
    }
    if (isPlaying) audio.play().catch(() => setIsPlaying(false));
    else audio.pause();
  }, [currentBeat, isPlaying]);

  const handlePlay = useCallback((beat) => {
    if (currentBeat?._id === beat._id) {
      setIsPlaying(p => !p);
    } else {
      setCurrentBeat(beat);
      setProgress(0);
      setIsPlaying(true);
    }
  }, [currentBeat]);

  const handlePrev = () => {
    const idx = beats.findIndex(b => b._id === currentBeat?._id);
    if (idx > 0) { setCurrentBeat(beats[idx - 1]); setProgress(0); setIsPlaying(true); }
  };

  const handleNext = () => {
    const idx = beats.findIndex(b => b._id === currentBeat?._id);
    if (idx < beats.length - 1) { setCurrentBeat(beats[idx + 1]); setProgress(0); setIsPlaying(true); }
  };

  const handleSeek = (pct) => {
    setProgress(pct);
    if (audioRef.current?.duration) audioRef.current.currentTime = (pct / 100) * audioRef.current.duration;
  };

  return (
    <PlayerContext.Provider value={{
      currentBeat, isPlaying, isLooping, progress, duration, volume,
      handlePlay, handlePrev, handleNext, handleSeek,
      setIsLooping, setVolume,
      togglePlay: () => setIsPlaying(p => !p),
    }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  return useContext(PlayerContext);
}