'use client';
import { useState, useMemo } from 'react';
import { usePlayer } from '../contexts/PlayerContext';
import BeatRow from './BeatRow';
import AllBeatCard from './AllBeatCard';

const GENRES = [
  { label: 'All',      value: 'all' },
  { label: 'Boom-Bap', value: 'boom-bap' },
  { label: 'Trap',     value: 'trap' },
  { label: 'Detroit',  value: 'detroit' },
  { label: 'R&B',      value: 'r&b' },
  { label: 'Drill',    value: 'drill' },
  { label: 'Lo-Fi',    value: 'lo-fi' },
];

export default function AllBeats({ beats, collections = [], onBuy }) {
  const [search, setSearch]               = useState('');
  const [sortBy, setSortBy]               = useState('default');
  const [layout, setLayout]               = useState('table');
  const [activeCollection, setActiveCollection] = useState(null);
  const [activeGenre, setActiveGenre]     = useState('all');

  const { currentBeat, isPlaying, handlePlay } = usePlayer();

  const featuredBeat = beats.find(b => b.isFeatured) || beats[0];
  const isFeatPlaying = currentBeat?._id === featuredBeat?._id && isPlaying;

  const filtered = useMemo(() =>
    beats
      .filter(b => !activeCollection || b.collection?._id === activeCollection)
      .filter(b => {
        if (activeGenre === 'all') return true;
        return b.tags?.some(t => {
          const norm = t.toLowerCase().replace(/[\s&]/g, '-');
          return norm.includes(activeGenre) || activeGenre.includes(norm);
        });
      })
      .filter(b =>
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.tags?.some(t => t.toLowerCase().includes(search.toLowerCase()))
      )
      .sort((a, b) => {
        if (sortBy === 'bpm-asc')   return a.bpm - b.bpm;
        if (sortBy === 'bpm-desc')  return b.bpm - a.bpm;
        if (sortBy === 'price-asc') return (a.prices?.mp3 ?? 29) - (b.prices?.mp3 ?? 29);
        if (sortBy === 'plays')     return b.plays - a.plays;
        return 0;
      }),
    [beats, activeCollection, activeGenre, search, sortBy]
  );

  return (
    <div className="ab-root">

      {/* ── HERO ── */}
      <section className="ab-hero">
        <div className="ab-hero-inner">
          <div className="ab-eyebrow">
            <span className="ab-eyebrow-dot" />
            CATALOG / VOL. 01
            <span className="ab-eyebrow-rule" />
            DETROIT, MI
          </div>
          <h1 className="ab-hero-title">All Beats</h1>
          <p className="ab-hero-sub">Iron Fist Catalog · Updated Weekly</p>
          <div className="ab-hero-stats">
            <div className="ab-stat">
              <span className="ab-stat-k">In Catalog</span>
              <span className="ab-stat-v">{beats.length}</span>
            </div>
            <div className="ab-stat">
              <span className="ab-stat-k">Genres</span>
              <span className="ab-stat-v">12</span>
            </div>
            <div className="ab-stat">
              <span className="ab-stat-k">Last Drop</span>
              <span className="ab-stat-v">May '25</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED DROP ── */}
      {featuredBeat && (
        <div className="ab-featured">
          <div className="ab-feat-card">
            <div className="ab-feat-body">
              <span className="ab-feat-tag">◢ Featured Drop · This Week</span>
              <h2 className="ab-feat-title">{featuredBeat.title}</h2>
              <div className="ab-feat-meta">
                {featuredBeat.bpm && <span><strong>{featuredBeat.bpm}</strong> BPM</span>}
                {featuredBeat.key && <span><strong>{featuredBeat.key}</strong> Key</span>}
                {featuredBeat.tags?.slice(0, 3).map(t => <span key={t}>{t}</span>)}
              </div>
              <div className="ab-feat-actions">
                <button
                  className={`ab-feat-play${isFeatPlaying ? ' playing' : ''}`}
                  onClick={() => handlePlay(featuredBeat)}
                  aria-label={isFeatPlaying ? 'Pause' : 'Play featured beat'}
                >
                  {isFeatPlaying ? '❚❚' : '▶'}
                </button>
                <span className="ab-feat-price">${featuredBeat.prices?.mp3 ?? 29}</span>
                <button className="ab-btn ab-btn-primary" onClick={() => onBuy(featuredBeat)}>+ Add to Cart</button>
                <button className="ab-btn" onClick={() => onBuy(featuredBeat)}>License Options</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── FILTER BAR ── */}
      <div className="ab-filterbar">
        <span className="ab-filter-lbl">◢ Genre</span>
        {GENRES.map(g => (
          <button
            key={g.value}
            className={`ab-chip${activeGenre === g.value ? ' active' : ''}`}
            onClick={() => setActiveGenre(g.value)}
          >
            {g.label}
          </button>
        ))}
        <span className="ab-spacer" />
        <div className="ab-search-wrap">
          <input
            className="ab-search"
            placeholder="SEARCH CATALOG"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select className="ab-sort" value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="default">Newest First</option>
          <option value="plays">Most Played</option>
          <option value="bpm-asc">BPM ↑</option>
          <option value="bpm-desc">BPM ↓</option>
          <option value="price-asc">Price ↑</option>
        </select>
        <div className="ab-view-toggle">
          <button
            className={`ab-view-btn${layout === 'table' ? ' active' : ''}`}
            onClick={() => setLayout('table')}
            title="List view"
          >☰</button>
          <button
            className={`ab-view-btn${layout === 'grid' ? ' active' : ''}`}
            onClick={() => setLayout('grid')}
            title="Grid view"
          >⊞</button>
        </div>
      </div>

      {/* ── COLLECTIONS (if any) ── */}
      {collections.length > 0 && (
        <div className="collection-tabs">
          <button
            className={`col-tab${!activeCollection ? ' active' : ''}`}
            onClick={() => setActiveCollection(null)}
          >All</button>
          {collections.map(c => (
            <button
              key={c._id}
              className={`col-tab${activeCollection === c._id ? ' active' : ''}`}
              onClick={() => setActiveCollection(c._id)}
            >
              {c.title}
            </button>
          ))}
        </div>
      )}

      {/* ── RESULTS COUNT ── */}
      <div className="ab-results-bar">
        <span className="ab-results-count">{filtered.length} beats</span>
      </div>

      {/* ── TABLE VIEW ── */}
      {layout === 'table' ? (
        <div className="ab-beats-bg">
        <div className="ab-beats-section">
          <div className="ab-beats-head">
            <span />
            <span>Title</span>
            <span>BPM</span>
            <span>Key</span>
            <span>Waveform</span>
            <span>Length</span>
            <span>Price</span>
            <span />
          </div>
          <div className="ab-beats-table">
            {filtered.map((b, i) => (
              <div key={b._id} className="beat-anim-wrap" style={{ '--i': Math.min(i, 16) }}>
                <BeatRow beat={b} index={i} onBuy={onBuy} />
              </div>
            ))}
          </div>
        </div>
        </div>
      ) : (
        /* ── GRID VIEW ── */
        <div className="ab-grid-wrap">
          <div key={activeCollection ?? 'all'} className="ab-grid">
            {filtered.map((b, i) => (
              <div key={b._id} className="beat-anim-wrap" style={{ '--i': Math.min(i, 16) }}>
                <AllBeatCard beat={b} index={i} onBuy={onBuy} />
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}