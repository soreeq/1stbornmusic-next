'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function Gallery({ photos = [] }) {
  const [lightbox, setLightbox] = useState(null);

  if (photos.length === 0) {
    return (
      <div className="gallery-empty">
        <div className="gallery-empty-icon">◻</div>
        <div className="gallery-empty-label">No photos yet</div>
        <div className="gallery-empty-sub">Add photos via Sanity Studio → Gallery Photo</div>
      </div>
    );
  }

  return (
    <>
      <div className="section gallery-section">
        <div className="section-title">Gallery</div>
        <div className="section-sub">Photos · Press · Behind the scenes</div>
        <div className="gallery-grid">
          {photos.map((photo, i) => (
            <button
              key={photo._id}
              className="gallery-item"
              onClick={() => setLightbox(i)}
              style={{ '--aspect': photo.height && photo.width ? `${photo.width} / ${photo.height}` : '4 / 3' }}
            >
              <Image
                src={photo.imageUrl}
                alt={photo.caption || `Photo ${i + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                style={{ objectFit: 'cover' }}
                placeholder={photo.imageLqip ? 'blur' : 'empty'}
                blurDataURL={photo.imageLqip}
              />
              {photo.caption && (
                <div className="gallery-item-caption">{photo.caption}</div>
              )}
            </button>
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <div className="gallery-lightbox" onClick={() => setLightbox(null)}>
          <button className="gallery-lb-close" onClick={() => setLightbox(null)}>✕</button>
          <button
            className="gallery-lb-arrow gallery-lb-prev"
            onClick={e => { e.stopPropagation(); setLightbox(i => (i - 1 + photos.length) % photos.length); }}
          >
            ←
          </button>
          <div className="gallery-lb-inner" onClick={e => e.stopPropagation()}>
            <div className="gallery-lb-img-wrap">
              <Image
                src={photos[lightbox].imageUrl}
                alt={photos[lightbox].caption || `Photo ${lightbox + 1}`}
                fill
                sizes="100vw"
                style={{ objectFit: 'contain' }}
              />
            </div>
            {photos[lightbox].caption && (
              <div className="gallery-lb-caption">{photos[lightbox].caption}</div>
            )}
            <div className="gallery-lb-counter">{lightbox + 1} / {photos.length}</div>
          </div>
          <button
            className="gallery-lb-arrow gallery-lb-next"
            onClick={e => { e.stopPropagation(); setLightbox(i => (i + 1) % photos.length); }}
          >
            →
          </button>
        </div>
      )}
    </>
  );
}