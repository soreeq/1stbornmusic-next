'use client';
import { useState } from 'react';
import { PlayerProvider } from '../contexts/PlayerContext';
import { CartProvider, useCart } from '../contexts/CartContext';
import Nav from './Nav';
import AudioPlayer from './AudioPlayer';
import Projects from './Projects';
import AllBeats from './AllBeats';
import BioSection from './BioSection';
import Gallery from './Gallery';
import HipHopLegacy from './HipHopLegacy';
import Contact from './Contact';
import LicenseModal from './LicenseModal';
import CartDrawer from './CartDrawer';

function StoreInner({ beats, collections, videos, photos }) {
  const [tab, setTab] = useState('projects');
  const [modal, setModal] = useState(null);
  const { toast } = useCart();

  return (
    <>
      <Nav tab={tab} setTab={setTab} />

      <main className="main">
        <div className="page-wrap">
          {tab === 'projects' && (
            <Projects beats={beats} collections={collections} videos={videos} onTabChange={setTab} onBuy={setModal} />
          )}
          {tab === 'beats'   && <AllBeats beats={beats} onBuy={setModal} />}
          {tab === 'gallery' && <Gallery photos={photos} />}
          {tab === 'bio'     && <BioSection />}
          {tab === 'contact' && <Contact />}
          {tab === 'legacy'  && <HipHopLegacy beats={beats} onTabChange={setTab} />}
        </div>
      </main>

      <AudioPlayer />

      {modal && <LicenseModal beat={modal} onClose={() => setModal(null)} />}
      <CartDrawer />
      {toast && <div className="toast">{toast}</div>}
    </>
  );
}

export default function BeatStore({ beats, collections, videos, photos }) {
  return (
    <PlayerProvider beats={beats}>
      <CartProvider>
        <StoreInner beats={beats} collections={collections} videos={videos} photos={photos} />
      </CartProvider>
    </PlayerProvider>
  );
}