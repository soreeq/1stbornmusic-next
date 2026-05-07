'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

const PHOTOS = ['/photos/photo1.jpg', '/photos/photo2.jpg', '/photos/photo3.jpg', '/photos/photo4.jpg', '/photos/photo5.jpg'];

export default function PhotoSlider() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  const goTo = useCallback((idx) => {
    setCurrent(idx);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setCurrent(c => (c + 1) % PHOTOS.length), 4000);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => setCurrent(c => (c + 1) % PHOTOS.length), 4000);
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="pslider">
      <div className="pslider-track" style={{ transform: `translateX(-${current * 100}%)` }}>
        {PHOTOS.map((src, i) => (
          <div key={src} className="pslider-slide">
            <img src={src} alt={`1stBornMusic ${i + 1}`} style={{ width: '100%', display: 'block', objectFit: 'cover', filter: 'grayscale(20%) contrast(1.05)' }} />
          </div>
        ))}
      </div>
      <div className="pslider-dots">
        {PHOTOS.map((_, i) => (
          <button key={i} className={`pslider-dot ${i === current ? 'active' : ''}`} onClick={() => goTo(i)} />
        ))}
      </div>
      <div className="pslider-arrows">
        <button className="pslider-arrow" onClick={() => goTo((current - 1 + PHOTOS.length) % PHOTOS.length)}>◀</button>
        <button className="pslider-arrow" onClick={() => goTo((current + 1) % PHOTOS.length)}>▶</button>
      </div>
    </div>
  );
}