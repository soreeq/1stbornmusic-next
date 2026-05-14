'use client';
import { useState } from 'react';
import { PlayerProvider } from '../contexts/PlayerContext';
import { CartProvider, useCart } from '../contexts/CartContext';
import Nav from './Nav';
import AudioPlayer from './AudioPlayer';
import Projects from './Projects';
import AllBeats from './AllBeats';
import Shop from './Shop';
import BioSection from './BioSection';
import BigProofMemoriam from './BigProofMemoriam';
import Contact from './Contact';
import LicenseModal from './LicenseModal';
import CartDrawer from './CartDrawer';

function StoreInner({ beats, collections, videos }) {
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
          {tab === 'shop'    && <Shop />}
          {tab === 'bio'     && <><BioSection /><BigProofMemoriam /></>}
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

export default function BeatStore({ beats, collections, videos }) {
  return (
    <PlayerProvider beats={beats}>
      <CartProvider>
        <StoreInner beats={beats} collections={collections} videos={videos} />
      </CartProvider>
    </PlayerProvider>
  );
}