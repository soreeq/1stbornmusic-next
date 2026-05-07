'use client';
import { useState } from 'react';
import { PlayerProvider } from '../contexts/PlayerContext';
import { CartProvider, useCart } from '../contexts/CartContext';
import Nav from './Nav';
import AudioPlayer from './AudioPlayer';
import VideoSlider from './VideoSlider';
import BioSection from './BioSection';
import PhotoSlider from './PhotoSlider';
import BeatCard from './BeatCard';
import AllBeats from './AllBeats';
import Shop from './Shop';
import Bio from './Bio';
import Contact from './Contact';
import LicenseModal from './LicenseModal';
import CartDrawer from './CartDrawer';

function StoreInner({ beats }) {
  const [tab, setTab] = useState('projects');
  const [modal, setModal] = useState(null);
  const { toast } = useCart();

  const featuredBeats = beats.filter(b => b.isFeatured);

  return (
    <>
      <Nav tab={tab} setTab={setTab} />

      <main className="main">
        <div className="page-wrap">
          {tab === 'projects' && (
            <div>
              <VideoSlider beats={beats} onTabChange={setTab} />
              <BioSection />
              <div className="section" style={{ borderTop: '1px solid #111', paddingBottom: 0, display: 'flex', justifyContent: 'center' }}>
                <PhotoSlider />
              </div>
              <div className="section" style={{ paddingTop: 40 }}>
                <div className="section-title">Featured Beats</div>
                <div className="section-sub">Top picks from the catalog</div>
                <div className="beats-grid">
                  {featuredBeats.map((b, i) => <BeatCard key={b._id} beat={b} index={i} onBuy={setModal} />)}
                </div>
              </div>
            </div>
          )}
          {tab === 'beats'   && <AllBeats beats={beats} onBuy={setModal} />}
          {tab === 'shop'    && <Shop />}
          {tab === 'bio'     && <Bio />}
          {tab === 'contact' && <Contact />}
        </div>
      </main>

      <AudioPlayer />

      {modal && <LicenseModal beat={modal} onClose={() => setModal(null)} />}
      <CartDrawer />
      {toast && <div className="toast">{toast}</div>}
    </>
  );
}

export default function BeatStore({ beats }) {
  return (
    <PlayerProvider beats={beats}>
      <CartProvider>
        <StoreInner beats={beats} />
      </CartProvider>
    </PlayerProvider>
  );
}