'use client';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function BigProofMemoriam() {
  const [crossRef, crossVis]   = useScrollReveal(0.2);
  const [titleRef, titleVis]   = useScrollReveal(0.15);
  const [gridRef, gridVis]     = useScrollReveal(0.1);
  const [quoteRef, quoteVis]   = useScrollReveal(0.2);
  const [legacyRef, legacyVis] = useScrollReveal(0.15);
  const [footRef, footVis]     = useScrollReveal(0.3);

  return (
    <section className="memoriam">
      <div className="mem-inner">

        <div ref={crossRef} className={`mem-cross scroll-reveal ${crossVis ? 'visible' : ''}`}>
          <span className="mem-cross-line" />
          <span className="mem-cross-glyph">✝</span>
          <span className="mem-cross-line" />
        </div>

        <div ref={titleRef} className={`scroll-reveal ${titleVis ? 'visible' : ''}`}>
          <div className="mem-eyebrow">In Loving Memory · Forever Detroit</div>
          <h2 className="mem-name">Big Proof</h2>
          <p className="mem-realname">DeShaun Dupree Holton</p>
          <div className="mem-dates">
            <div>
              <span className="mem-date-y">1973</span>
              <span className="mem-date-lbl">Born · Oct 2</span>
            </div>
            <span className="mem-dates-sep" />
            <div>
              <span className="mem-date-y">2006</span>
              <span className="mem-date-lbl">Rest · Apr 11</span>
            </div>
          </div>
        </div>

        <div ref={gridRef} className={`mem-grid scroll-reveal ${gridVis ? 'visible' : ''}`}>
          <div className="mem-portrait">
            <span className="mem-corner tl" />
            <span className="mem-corner br" />
            <span className="mem-archive">ARCHIVE · IRON FIST</span>
          </div>

          <div className="mem-copy">
            <h3>Founder of <em>D12</em>. Architect of <em>Iron Fist Records</em>. The reason 1stBorn is here.</h3>
            <p>
              <strong>DeShaun Dupree Holton</strong> — known to the world as <strong>Big Proof</strong> — was
              the cornerstone of Detroit hip-hop. Childhood friend of Eminem, founder of <strong>D12</strong>,
              and the one who built <strong>Iron Fist Records</strong> from the ground up.
            </p>
            <p>
              His vision wasn't just music — it was the city. He saw talent before the rest of the world
              caught up, and he made room at the table for everyone who came after.
            </p>
            <p>
              He placed <strong>1stBorn</strong> at the helm of Iron Fist for one reason: he <em>saw him</em>.
              Saw the leadership, the patience, the long game.
            </p>
            <div className="mem-from">
              "You put the crown on my head before the world knew my name. Everything I build, I build in
              your honor. Long live Proof."
              <span className="mem-sig">— 1stBorn</span>
            </div>
          </div>
        </div>

        <div ref={quoteRef} className={`mem-quote scroll-reveal ${quoteVis ? 'visible' : ''}`}>
          <q>Detroit, the D, the city of champions — he carried it on his back.</q>
          <div className="mem-quote-src">— In tribute</div>
        </div>

        <div ref={legacyRef} className={`mem-legacy scroll-reveal ${legacyVis ? 'visible' : ''}`}>
          <div className="mem-legacy-cell">
            <span className="mem-legacy-k">Founded</span>
            <span className="mem-legacy-v">D12</span>
            <span className="mem-legacy-d">The Dirty Dozen — Detroit's defining hip-hop collective.</span>
          </div>
          <div className="mem-legacy-cell">
            <span className="mem-legacy-k">Built</span>
            <span className="mem-legacy-v">Iron Fist Records</span>
            <span className="mem-legacy-d">Independent label — platform for Detroit's next wave.</span>
          </div>
          <div className="mem-legacy-cell">
            <span className="mem-legacy-k">Solo</span>
            <span className="mem-legacy-v">Searching for Jerry Garcia</span>
            <span className="mem-legacy-d">2005 — his definitive solo statement.</span>
          </div>
          <div className="mem-legacy-cell">
            <span className="mem-legacy-k">Legacy</span>
            <span className="mem-legacy-v">The Blueprint</span>
            <span className="mem-legacy-d">Mentor, brother, gatekeeper. Forever.</span>
          </div>
        </div>

        <div ref={footRef} className={`mem-foot scroll-reveal ${footVis ? 'visible' : ''}`}>
          Rest in Power
          <small>1973 · 2006 · Long Live Proof</small>
        </div>

      </div>
    </section>
  );
}