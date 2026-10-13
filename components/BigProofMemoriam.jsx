'use client';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { MEMORIAM_DEFAULTS } from '../lib/memoriamDefaults';

const inlineComponents = {
  block: { normal: ({ children }) => <>{children}</> },
};
const linkComponents = {
  marks: {
    link: ({ value, children }) => (
      <a href={value?.href} target={value?.href?.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{children}</a>
    ),
  },
};

// With a `memoriam` document in Sanity every field is taken from it as-is (an
// emptied field hides its part). Without one, the built-in defaults are shown.
export default function BigProofMemoriam({ memoriam }) {
  const m = memoriam ?? MEMORIAM_DEFAULTS;
  const [crossRef, crossVis]   = useScrollReveal(0.2);
  const [titleRef, titleVis]   = useScrollReveal(0.15);
  const [gridRef, gridVis]     = useScrollReveal(0.1);
  const [memRef, memVis]       = useScrollReveal(0.15);
  const [quoteRef, quoteVis]   = useScrollReveal(0.2);
  const [legacyRef, legacyVis] = useScrollReveal(0.15);
  const [footRef, footVis]     = useScrollReveal(0.3);

  const dims = m.portraitDims;
  const portraitRatio = dims?.width && dims?.height ? Math.min(1.25, Math.max(0.6, dims.width / dims.height)) : null;
  const portraitSrc = m.portrait ? `${m.portrait}?w=1000&auto=format` : '/big-proof.webp';
  const legacy = m.legacy ?? [];
  const hasMemories = (m.memories ?? []).length > 0;

  return (
    <section className="memoriam">
      <div className="mem-inner">

        <div ref={crossRef} className={`mem-cross scroll-reveal ${crossVis ? 'visible' : ''}`}>
          <span className="mem-cross-line" />
          <span className="mem-cross-glyph">✝</span>
          <span className="mem-cross-line" />
        </div>

        <div ref={titleRef} className={`scroll-reveal ${titleVis ? 'visible' : ''}`}>
          {m.eyebrow && <div className="mem-eyebrow">{m.eyebrow}</div>}
          <h2 className="mem-name">{m.name}</h2>
          {m.realName && <p className="mem-realname">{m.realName}</p>}
          {(m.birthYear || m.deathYear) && (
            <div className="mem-dates">
              {m.birthYear && (
                <div>
                  <span className="mem-date-y">{m.birthYear}</span>
                  <span className="mem-date-lbl">{m.birthLabel}</span>
                </div>
              )}
              {m.birthYear && m.deathYear && <span className="mem-dates-sep" />}
              {m.deathYear && (
                <div>
                  <span className="mem-date-y">{m.deathYear}</span>
                  <span className="mem-date-lbl">{m.deathLabel}</span>
                </div>
              )}
            </div>
          )}
        </div>

        <div ref={gridRef} className={`mem-grid scroll-reveal ${gridVis ? 'visible' : ''}`}>
          <div className="mem-portrait" style={portraitRatio ? { aspectRatio: portraitRatio } : undefined}>
            <Image src={portraitSrc} alt={`${m.name}${m.realName ? ` — ${m.realName}` : ''}`} fill sizes="480px" style={{ objectFit: 'cover', objectPosition: 'top' }} />
            <span className="mem-corner tl" />
            <span className="mem-corner br" />
            {m.portraitTag && <span className="mem-archive">{m.portraitTag}</span>}
          </div>

          <div className="mem-copy">
            {(m.headline ?? []).length > 0 && (
              <h3><PortableText value={m.headline} components={inlineComponents} /></h3>
            )}
            {(m.body ?? []).length > 0 && <PortableText value={m.body} components={linkComponents} />}
            {m.tribute && (
              <div className="mem-from">
                {m.tribute}
                {m.tributeSignature && <span className="mem-sig">{m.tributeSignature}</span>}
              </div>
            )}
          </div>
        </div>

        {hasMemories && (
          <div ref={memRef} className={`mem-memories scroll-reveal ${memVis ? 'visible' : ''}`}>
            <div className="mem-memories-lbl">◢ Remembered by 1stBorn</div>
            <PortableText value={m.memories} components={linkComponents} />
          </div>
        )}

        {m.quote && (
          <div ref={quoteRef} className={`mem-quote scroll-reveal ${quoteVis ? 'visible' : ''}`}>
            <q>{m.quote}</q>
            {m.quoteSource && <div className="mem-quote-src">{m.quoteSource}</div>}
          </div>
        )}

        {legacy.length > 0 && (
          <div ref={legacyRef} className={`mem-legacy scroll-reveal ${legacyVis ? 'visible' : ''}`}>
            {legacy.map((c, i) => (
              <div key={c._key || i} className="mem-legacy-cell">
                <span className="mem-legacy-k">{c.label}</span>
                <span className="mem-legacy-v">{c.value}</span>
                <span className="mem-legacy-d">{c.text}</span>
              </div>
            ))}
          </div>
        )}

        {m.footTitle && (
          <div ref={footRef} className={`mem-foot scroll-reveal ${footVis ? 'visible' : ''}`}>
            {m.footTitle}
            {m.footSmall && <small>{m.footSmall}</small>}
          </div>
        )}

      </div>
    </section>
  );
}
