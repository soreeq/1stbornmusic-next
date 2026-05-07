'use client';
import { useCart } from '../contexts/CartContext';
import { IconClose } from './Icons';

const LICENSES = [
  { key: 'mp3',       name: 'MP3 Lease',        price: 29,  icon: '♪', desc: 'Non-commercial / 2500 copies',  features: ['MP3 File (320kbps)', '2,500 copies', 'Non-profit use', 'Must credit producer'] },
  { key: 'wav',       name: 'WAV Lease',         price: 49,  icon: '◈', desc: 'Standard / 5000 copies',        features: ['WAV + MP3 Files', '5,000 copies', 'Streaming allowed', 'Must credit producer'] },
  { key: 'trackout',  name: 'Trackout Lease',    price: 99,  icon: '◉', desc: 'Stems / 10,000 copies',         features: ['WAV + MP3 + Stems', '10,000 copies', 'Streaming + radio', 'Must credit producer'] },
  { key: 'unlimited', name: 'Unlimited Lease',   price: 149, icon: '◆', desc: 'Unlimited copies',              features: ['WAV + MP3 + Stems', 'Unlimited copies', 'Streaming + radio + sync', 'Must credit producer'] },
  { key: 'exclusive', name: 'Exclusive Rights',  price: 299, icon: '★', desc: 'Full ownership transfer',       features: ['All files + stems', 'Unlimited everything', 'Full commercial rights', 'Producer credit optional'] },
];

export { LICENSES };

export default function LicenseModal({ beat, onClose }) {
  const { addToCart } = useCart();
  if (!beat) return null;

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <div>
            <div className="modal-title">{beat.title}</div>
            <div className="modal-meta">{beat.bpm} BPM · {beat.key}</div>
          </div>
          <button className="modal-close" onClick={onClose}><IconClose /></button>
        </div>
        <div className="modal-body">
          {LICENSES.map(lic => (
            <div key={lic.key} className="lic-row" onClick={() => { addToCart(beat, lic); onClose(); }}>
              <div style={{ fontSize: 22, width: 32, textAlign: 'center' }}>{lic.icon}</div>
              <div className="lic-row-name">
                <div className="lic-row-title">{lic.name}</div>
                <div className="lic-row-desc">{lic.desc}</div>
              </div>
              <div className="lic-row-price">${lic.price}</div>
              <button className="btn btn-sm btn-accent" onClick={e => { e.stopPropagation(); addToCart(beat, lic); onClose(); }}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}