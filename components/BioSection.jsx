'use client';

const CREDITS = [
  { name: 'Eminem',     role: 'Music Video',        work: '"Toy Soldiers"' },
  { name: 'D12',        role: 'Music Video',         work: '"Fight Music"' },
  { name: 'Big Proof',  role: 'Music Video · Label', work: '"Gurls Wit da BOOM"' },
  { name: 'Bizarre',    role: 'Music Video',         work: '"Hip Hop"' },
  { name: 'Obie Trice', role: 'Music Video',         work: '"Cry Now"' },
];

export default function BioSection() {
  return (
    <section className="bio-section">
      <div className="bio-section-inner">
        <div className="bio-eyebrow">
          <span className="bio-eyebrow-dot" />
          BIO / FILE NO. 001
          <span className="bio-eyebrow-rule" />
          DETROIT, MI
        </div>

        <h2 className="bio-section-title">Cleveland L. Hurd</h2>
        <p className="bio-section-sub">Known to the world as 1stBorn</p>

        <div className="bio-ed-grid">
          <div className="bio-ed-portrait">
            <img src="/cleveland.jpg" alt="Cleveland L. Hurd" />
            <div className="bio-ed-frame-tag">PRESS / B&amp;W</div>
            <div className="bio-ed-scale">6'5&quot;<small>HEIGHT ON RECORD</small></div>
          </div>

          <div>
            <h3 className="bio-ed-heading">
              A low-key giant from Detroit with a presence that carries the room — <em>and the label.</em>
            </h3>
            <p className="bio-lede">
              Cleveland L. Hurd has always been known for his low-key personality, even though he towers over most people at 6'5ft tall. His presence is as commanding in person as it is on stage.
            </p>
            <p className="bio-ed-p">
              The late, great <strong>Big Proof</strong>, of multi-platinum status and <strong>D12</strong> fame, placed him at the helm of his label <strong>Iron Fist Records</strong> because of his unique and impressive combination of leadership, and keen sense of business skills.
            </p>
            <p className="bio-ed-p">
              As an artist, he is known to the world as <strong>1stBorn</strong> — appearing in videos including <em>Eminem's "Toy Soldiers,"</em> <em>D12's "Fight Music,"</em> <em>Big Proof's "Gurls Wit da BOOM,"</em> <em>Bizarre's "Hip Hop,"</em> and <em>Obie Trice's "Cry Now."</em>
            </p>
            <p className="bio-ed-p">
              Featured in <strong>Qd3's documentary <em>BEEF</em></strong>, regularly aired on <strong>FUSE TV</strong>.
            </p>
          </div>
        </div>

        <div className="bio-pull-quote">
          <q>Low-key personality. Commanding presence. Detroit-born, Iron Fist-raised.</q>
          <div className="bio-pull-src">— Press, on 1stBorn</div>
        </div>

        <div className="bio-stats">
          <div className="bio-stat"><span className="bio-stat-num">6'5<small>"</small></span><span className="bio-stat-lbl">Height</span><span className="bio-stat-sub">Low-key giant</span></div>
          <div className="bio-stat"><span className="bio-stat-num">5<small>+</small></span><span className="bio-stat-lbl">Music Videos</span><span className="bio-stat-sub">Eminem · D12 · Obie Trice</span></div>
          <div className="bio-stat"><span className="bio-stat-num">1</span><span className="bio-stat-lbl">Label at the helm</span><span className="bio-stat-sub">Iron Fist Records</span></div>
          <div className="bio-stat"><span className="bio-stat-num">FUSE</span><span className="bio-stat-lbl">Featured doc</span><span className="bio-stat-sub">Qd3's <em>BEEF</em></span></div>
        </div>

        <div className="bio-credits-head">
          <span className="bio-credits-lbl">◢ Worked With</span>
          <span className="bio-credits-rule" />
        </div>
        <div className="bio-credits-grid">
          {CREDITS.map(c => (
            <div key={c.name} className="bio-credit">
              <span className="bio-credit-name">{c.name}</span>
              <span className="bio-credit-role">{c.role}</span>
              <span className="bio-credit-work">{c.work}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}