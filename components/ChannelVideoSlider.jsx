'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function ChannelVideoSlider({ videos = [] }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);

  if (!videos.length) return null;

  const current = videos[active];

  function selectVideo(i) {
    setActive(i);
    setPlaying(false);
  }

  return (
    <div className="cvs">
      <div className="cvs-header">
        <span className="cvs-eyebrow">◢ Latest Releases</span>
        <a
          href="https://www.youtube.com/@1stMF"
          target="_blank"
          rel="noopener noreferrer"
          className="cvs-channel-link"
        >
          @1stBorn313 ↗
        </a>
      </div>

      <div className="cvs-stage">
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${current.videoId}?autoplay=1&rel=0`}
            title={current.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="cvs-iframe"
          />
        ) : (
          <button className="cvs-thumb-wrap" onClick={() => setPlaying(true)}>
            <Image
              src={current.thumb}
              alt={current.title}
              fill
              sizes="(max-width: 768px) 100vw, 75vw"
              style={{ objectFit: 'cover' }}
            />
            <div className="cvs-overlay" />
            <div className="cvs-play-btn">▶</div>
            <div className="cvs-thumb-title">{current.title}</div>
          </button>
        )}
      </div>

      <div className="cvs-rail">
        {videos.map((v, i) => (
          <button
            key={v.videoId}
            className={`cvs-rail-item ${i === active ? 'active' : ''}`}
            onClick={() => selectVideo(i)}
          >
            <div className="cvs-rail-thumb">
              <Image
                src={v.thumb}
                alt={v.title}
                fill
                sizes="160px"
                style={{ objectFit: 'cover' }}
              />
              {i === active && playing && <div className="cvs-rail-playing">▶</div>}
            </div>
            <span className="cvs-rail-title">{v.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}