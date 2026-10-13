// Single source for the Big Proof memoriam copy: fallback when no `memoriam`
// document exists in Sanity, and the seed content for that document.

let n = 0;
const span = (text, marks = []) => ({ _type: 'span', _key: `m${++n}`, text, marks });
const block = (...parts) => ({
  _type: 'block',
  _key: `mb${++n}`,
  style: 'normal',
  markDefs: [],
  children: parts.map(p => (typeof p === 'string' ? span(p) : span(p[0], p[1]))),
});
const B = 'strong';
const I = 'em';

export const MEMORIAM_DEFAULTS = {
  eyebrow: 'In Loving Memory · Forever Detroit',
  name: 'Big Proof',
  realName: 'DeShaun Dupree Holton',
  birthYear: '1973',
  birthLabel: 'Born · Oct 2',
  deathYear: '2006',
  deathLabel: 'Rest · Apr 11',
  portraitTag: 'ARCHIVE · IRON FIST',
  headline: [
    block('Founder of ', ['D12', [I]], '. Architect of ', ['Iron Fist Records', [I]], '. The reason 1stBorn is here.'),
  ],
  body: [
    block(
      ['DeShaun Dupree Holton', [B]], ' — known to the world as ', ['Big Proof', [B]],
      ' — was the cornerstone of Detroit hip-hop. Childhood friend of Eminem, founder of ', ['D12', [B]],
      ', and the one who built ', ['Iron Fist Records', [B]], ' from the ground up.',
    ),
    block('His vision wasn\'t just music — it was the city. He saw talent before the rest of the world caught up, and he made room at the table for everyone who came after.'),
    block(
      'He placed ', ['1stBorn', [B]], ' at the helm of Iron Fist for one reason: he ', ['saw him', [I]],
      '. Saw the leadership, the patience, the long game.',
    ),
  ],
  tribute: '"You put the crown on my head before the world knew my name. Everything I build, I build in your honor. Long live Proof."',
  tributeSignature: '— 1stBorn',
  memories: [],
  quote: 'Detroit, the D, the city of champions — he carried it on his back.',
  quoteSource: '— In tribute',
  legacy: [
    { _key: 'lg1', label: 'Founded', value: 'D12', text: 'The Dirty Dozen — Detroit\'s defining hip-hop collective.' },
    { _key: 'lg2', label: 'Built', value: 'Iron Fist Records', text: 'Independent label — platform for Detroit\'s next wave.' },
    { _key: 'lg3', label: 'Solo', value: 'Searching for Jerry Garcia', text: '2005 — his definitive solo statement.' },
    { _key: 'lg4', label: 'Legacy', value: 'The Blueprint', text: 'Mentor, brother, gatekeeper. Forever.' },
  ],
  footTitle: 'Rest in Power',
  footSmall: '1973 · 2006 · Long Live Proof',
};
