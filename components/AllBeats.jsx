'use client';
import { useState } from 'react';
import BeatCard from './BeatCard';
import BeatRow from './BeatRow';

export default function AllBeats({ beats, collections = [], onBuy }) {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [layout, setLayout] = useState('grid');
  const [activeCollection, setActiveCollection] = useState(null);

  const filtered = beats
    .filter(b => !activeCollection || b.collection?._id === activeCollection)
    .filter(b => b.title.toLowerCase().includes(search.toLowerCase()) || b.tags?.some(t => t.toLowerCase().includes(search.toLowerCase())))
    .sort((a, b) => {
      if (sortBy === 'bpm-asc')   return a.bpm - b.bpm;
      if (sortBy === 'bpm-desc')  return b.bpm - a.bpm;
      if (sortBy === 'price-asc') return (a.prices?.mp3 ?? 29) - (b.prices?.mp3 ?? 29);
      if (sortBy === 'plays')     return b.plays - a.plays;
      return 0;
    });

  return (
    <div>
      {collections.length > 0 && (
        <div className="collection-tabs">
          <button className={`col-tab ${!activeCollection ? 'active' : ''}`} onClick={() => setActiveCollection(null)}>All</button>
          {collections.map(c => (
            <button key={c._id} className={`col-tab ${activeCollection === c._id ? 'active' : ''}`} onClick={() => setActiveCollection(c._id)}>
              {c.title}
            </button>
          ))}
        </div>
      )}
      <div className="filter-bar">
        <input className="search-input" placeholder="Search beats, tags..." value={search} onChange={e => setSearch(e.target.value)} />
        <select className="filter-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="default">Sort: Default</option>
          <option value="plays">Most Played</option>
          <option value="bpm-asc">BPM ↑</option>
          <option value="bpm-desc">BPM ↓</option>
          <option value="price-asc">Price ↑</option>
        </select>
        <div className="view-toggle">
          <button className={`view-btn ${layout === 'grid' ? 'active' : ''}`} onClick={() => setLayout('grid')}>⊞</button>
          <button className={`view-btn ${layout === 'list' ? 'active' : ''}`} onClick={() => setLayout('list')}>☰</button>
        </div>
        <span className="results-count">{filtered.length} beats</span>
      </div>
      {layout === 'grid'
        ? <div className="beats-grid">{filtered.map((b, i) => <BeatCard key={b._id} beat={b} index={i} onBuy={onBuy} />)}</div>
        : <div className="beats-list">{filtered.map((b, i) => <BeatRow key={b._id} beat={b} index={i} onBuy={onBuy} />)}</div>
      }
    </div>
  );
}