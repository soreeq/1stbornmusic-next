'use client';
import { useState } from 'react';
import { PortableText } from '@portabletext/react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { IconIG, IconMail } from './Icons';
import { BIO_DEFAULTS } from '../lib/bioDefaults';

const ledeComponents = {
  block: { normal: ({ children }) => <p className="bio-lede">{children}</p> },
};
const paragraphComponents = {
  block: { normal: ({ children }) => <p className="bio-ed-p">{children}</p> },
  marks: {
    link: ({ value, children }) => (
      <a href={value?.href} target={value?.href?.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{children}</a>
    ),
  },
};

function linkIcon(url = '') {
  if (url.startsWith('mailto:')) return <IconMail />;
  if (url.includes('instagram.com')) return <IconIG />;
  return null;
}

// With a `bio` document in Sanity every field is taken from it as-is (an emptied
// field hides its section). Without one, the built-in defaults are shown.
export default function BioSection({ bio }) {
  const b = bio ?? BIO_DEFAULTS;
  const [headerRef, headerVis]     = useScrollReveal(0.15);
  const [portraitRef, portraitVis] = useScrollReveal(0.15);
  const [textRef, textVis]         = useScrollReveal(0.15);
  const [quoteRef, quoteVis]       = useScrollReveal(0.2);
  const [statsRef, statsVis]       = useScrollReveal(0.2);
  const [creditsRef, creditsVis]   = useScrollReveal(0.15);
  const [expanded, setExpanded]    = useState(false);

  const body = b.body ?? [];
  const [lede, ...rest] = body;
  const longStory = b.longStory ?? [];
  const stats = b.stats ?? [];
  const credits = b.credits ?? [];
  const tags = b.tags ?? [];
  const links = b.links ?? [];

  const dims = b.portraitDims;
  const portraitRatio = dims?.width && dims?.height ? Math.min(1.25, Math.max(0.6, dims.width / dims.height)) : null;
  const portraitSrc = b.portrait ? `${b.portrait}?w=1000&auto=format` : '/cleveland.jpg';

  return (
    <section className="bio-section">
      <div className="bio-section-inner">
        <div ref={headerRef} className={`bio-header-block scroll-reveal ${headerVis ? 'visible' : ''}`}>
          <div className="bio-eyebrow">
            <span className="bio-eyebrow-dot" />
            {b.fileNo}
            <span className="bio-eyebrow-rule" />
            {b.city}
          </div>

          <h2 className="bio-section-title">{b.name}</h2>
          {b.tagline && <p className="bio-section-sub">{b.tagline}</p>}
        </div>

        <div className="bio-ed-grid">
          <div
            ref={portraitRef}
            className={`bio-ed-portrait scroll-reveal ${portraitVis ? 'visible' : ''}`}
            style={portraitRatio ? { aspectRatio: portraitRatio } : undefined}
          >
            <img src={portraitSrc} alt={b.name} />
            {b.portraitTag && <div className="bio-ed-frame-tag">{b.portraitTag}</div>}
            {b.badgeValue && <div className="bio-ed-scale">{b.badgeValue}{b.badgeLabel && <small>{b.badgeLabel}</small>}</div>}
          </div>

          <div ref={textRef} className={`scroll-reveal-r ${textVis ? 'visible' : ''}`}>
            {b.headline && (
              <h3 className="bio-ed-heading">
                {b.headline}{b.headlineAccent && <> <em>{b.headlineAccent}</em></>}
              </h3>
            )}
            {lede && <PortableText value={[lede]} components={ledeComponents} />}
            {rest.length > 0 && <PortableText value={rest} components={paragraphComponents} />}

            {longStory.length > 0 && (
              <>
                {expanded && <PortableText value={longStory} components={paragraphComponents} />}
                <button className="btn btn-ghost btn-sm" style={{ marginTop: 16 }} onClick={() => setExpanded(e => !e)}>
                  {expanded ? 'Show Less ▲' : 'Show More ▼'}
                </button>
              </>
            )}

            {tags.length > 0 && (
              <div className="bio-tags">
                {tags.map(t => <span key={t} className="bio-tag">{t}</span>)}
              </div>
            )}
            {links.length > 0 && (
              <div className="bio-social">
                {links.map(l => (
                  <a key={l._key || l.url} href={l.url} target={l.url?.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="btn btn-outline btn-sm">
                    {linkIcon(l.url)} {l.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {b.quote && (
          <div ref={quoteRef} className={`bio-pull-quote scroll-reveal ${quoteVis ? 'visible' : ''}`}>
            <q>{b.quote}</q>
            {b.quoteSource && <div className="bio-pull-src">{b.quoteSource}</div>}
          </div>
        )}

        {stats.length > 0 && (
          <div ref={statsRef} className={`bio-stats ${statsVis ? 'stats-visible' : ''}`}>
            {stats.map((s, i) => (
              <div key={s._key || i} className="bio-stat">
                <span className="bio-stat-num">{s.value}{s.suffix && <small>{s.suffix}</small>}</span>
                <span className="bio-stat-lbl">{s.label}</span>
                {s.sub && <span className="bio-stat-sub">{s.sub}</span>}
              </div>
            ))}
          </div>
        )}

        {credits.length > 0 && (
          <>
            <div className="bio-credits-head">
              <span className="bio-credits-lbl">◢ Worked With</span>
              <span className="bio-credits-rule" />
            </div>
            <div ref={creditsRef} className={`bio-credits-grid ${creditsVis ? 'credits-visible' : ''}`}>
              {credits.map((c, i) => (
                <div key={c._key || c.name} className="bio-credit" style={{ '--i': i }}>
                  <span className="bio-credit-name">{c.name}</span>
                  <span className="bio-credit-role">{c.role}</span>
                  <span className="bio-credit-work">{c.work}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
