'use client';
import { useState } from 'react';
import { IconIG, IconMail } from './Icons';

export default function Bio() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bio-layout">
      <div className="bio-left">
        <img src="/cleveland.jpg" alt="Cleveland L. Hurd — 1stBorn" style={{ width: '100%', maxWidth: 320, display: 'block', border: '1px solid #1c1c1c', filter: 'grayscale(15%) contrast(1.08)' }} />
        <div style={{ marginTop: 20, fontSize: 11, color: 'var(--muted)', letterSpacing: '0.12em', textTransform: 'uppercase', textAlign: 'center' }}>Detroit, MI · Cleveland, OH</div>
        <div style={{ marginTop: 8, fontSize: 11, color: '#333', letterSpacing: '0.08em', textAlign: 'center' }}>a.k.a. C. Hurd</div>
      </div>
      <div className="bio-right">
        <div className="bio-name">1stBorn<span style={{ color: '#333' }}> · 313</span></div>
        <div className="bio-location">Cleveland L. Hurd · Iron Fist Records · Purple G.A.N.G.</div>
        <div className="bio-text">
          Cleveland L. Hurd has always been known for his low-key personality, even though he towers over most people at 6'5ft tall. His presence is as commanding in person as it is on stage. The late, great <em>Big Proof</em>, of multi-platinum status and D12 fame, placed him at the helm of his label <strong>Iron Fist Records</strong> because of his unique and impressive combination of leadership, and keen sense of business skills.
          <br /><br />
          As an artist, he is known to the world as <strong>1stBorn</strong>, who appeared in videos such as <em>Eminem's "Toy Soldiers,"</em> D12's "Fight Music," Big Proof's "Gurls Wit da BOOM," Bizarre's "Hip Hop," and Obie Trice's "Cry Now." Featured in Qd3's documentary <em>BEEF</em>, regularly aired on FUSE TV.
          {expanded && (
            <span>
              <br /><br />
              As CEO and Founder of Detroit's award winning rap group <strong>Purple G.A.N.G.</strong>, he is credited with touring nationally three times — twice with Eminem on his Anger Management tours featuring 50 Cent, Ludacris, Ras Kass, Mobb Deep, Papa Roach, MOP, Lil' Jon, G Unit and Bone Crusha. He also opened for D12 on the D12 World Tour alongside Slum Village, Guilty Simpson, Black Milk, and Fat Killahz. He has opened shows for legendary acts including Souls of Mischief, Xzibit, MC Breed, Wu-Tang Clan, Bubba Sparxxx, Twista, and many others.
              <br /><br />
              As President of <strong>Iron Fist Global</strong>, he has been developing market strategies for artists such as Big Proof, JerkNation, Big Dame, Azizz, J Hill, Comedian Howie Bell, Spanky Hayes and DC's sensation Shif-T of Pretti Punk'd.
              <br /><br />
              1stBorn made his debut with appearances on Big Proof's classic LPs <em>"I Miss the Hip Hop Shop," "Searchin for Jerry Garcia," "Hand 2 Hand,"</em> and <em>"Time A Tell"</em> (a collective effort written and recorded in 24hrs). He is also Co-Owner of <strong>The Original Hip Hop Shop</strong> — dedicated to healing Detroit and surrounding communities through Hip-Hop.
            </span>
          )}
        </div>
        <button onClick={() => setExpanded(e => !e)} style={{ marginTop: 16, background: 'none', border: '1px solid #222', color: 'var(--accent)', padding: '6px 16px', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit' }}>
          {expanded ? 'Show Less ▲' : 'Show More ▼'}
        </button>
        <div className="bio-tags" style={{ marginTop: 24 }}>
          {['Hip-Hop', 'Boom Bap', 'Detroit', 'Iron Fist Records', 'Purple G.A.N.G.', 'D12', 'Eminem', 'Underground', '313'].map(t => (
            <span key={t} className="bio-tag">{t}</span>
          ))}
        </div>
        <div className="bio-social" style={{ marginTop: 24 }}>
          <a href="https://www.facebook.com/1stbornmusic" target="_blank" rel="noopener" className="btn btn-outline btn-sm">Facebook</a>
          <a href="https://www.instagram.com/1stbornmusic" target="_blank" rel="noopener" className="btn btn-outline btn-sm"><IconIG /> Instagram</a>
          <a href="https://soundcloud.com/1stbornmusic" target="_blank" rel="noopener" className="btn btn-ghost btn-sm">Soundcloud</a>
          <a href="mailto:alivestalive@gmail.com" className="btn btn-ghost btn-sm"><IconMail /> Email</a>
        </div>
      </div>
    </div>
  );
}