'use client';
import { useState } from 'react';

function VideoCard({ video }) {
  const [imgError, setImgError] = useState(false);
  const thumb = imgError
    ? `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`
    : `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`;

  return (
    <a
      href={`https://www.youtube.com/watch?v=${video.videoId}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{ display: 'block', background: '#0a0a0a', border: '1px solid #1c1c1c', transition: 'border-color 0.15s', textDecoration: 'none' }}
      onMouseEnter={e => e.currentTarget.style.borderColor = '#333'}
      onMouseLeave={e => e.currentTarget.style.borderColor = '#1c1c1c'}
    >
      <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', background: '#000' }}>
        <img
          src={thumb}
          alt={video.title}
          onError={() => setImgError(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'grayscale(15%) contrast(1.05)', transition: 'transform 0.3s' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0)', transition: 'background 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.35)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0)'}
        >
          <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(217,43,58,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="18" viewBox="0 0 12 14" fill="#fff"><path d="M0 0l12 7-12 7V0z"/></svg>
          </div>
        </div>
      </div>
      <div style={{ padding: '14px 16px' }}>
        <div style={{ fontFamily: "'UnifrakturMaguntia', serif", fontSize: 18, color: '#fff', letterSpacing: '0.03em', marginBottom: 4 }}>
          {video.title}
        </div>
        {video.description && (
          <div style={{ fontSize: 12, color: '#444', lineHeight: 1.6 }}>{video.description}</div>
        )}
      </div>
    </a>
  );
}

export default function VideoGrid({ videos }) {
  if (!videos?.length) return null;

  return (
    <div className="section" style={{ borderTop: '1px solid #111', paddingTop: 40 }}>
      <div className="section-title">Watch</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
        <div className="section-sub" style={{ margin: 0 }}>Latest from the channel</div>
        <a
          href="https://www.youtube.com/@1stMF"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: 10, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', border: '1px solid var(--accent)', padding: '3px 10px', transition: 'all 0.15s' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--accent)'; }}
        >
          ↗ Channel
        </a>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 1, background: '#111' }}>
        {videos.map(v => <VideoCard key={v._id} video={v} />)}
      </div>
    </div>
  );
}