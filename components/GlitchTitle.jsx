'use client';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function GlitchTitle({ children, className = 'section-title', style }) {
  const [ref, visible] = useScrollReveal(0.3);
  return (
    <div
      ref={ref}
      className={`${className} glitch-title ${visible ? 'glitch-active' : ''}`}
      data-text={children}
      style={style}
    >
      {children}
    </div>
  );
}