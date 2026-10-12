// Single source for the Bio copy: it is the fallback when no `bio` document
// exists in Sanity yet, and the seed content written into that document.

let n = 0;
const span = (text, marks = []) => ({ _type: 'span', _key: `s${++n}`, text, marks });
const block = (...parts) => ({
  _type: 'block',
  _key: `b${++n}`,
  style: 'normal',
  markDefs: [],
  children: parts.map(p => (typeof p === 'string' ? span(p) : span(p[0], p[1]))),
});
const B = 'strong';
const I = 'em';

export const BIO_DEFAULTS = {
  fileNo: 'BIO / FILE NO. 001',
  city: 'DETROIT, MI',
  name: 'Cleveland L. Hurd',
  tagline: 'Known to the world as 1stBorn',
  portraitTag: 'PRESS / B&W',
  badgeValue: '6\'5"',
  badgeLabel: 'HEIGHT ON RECORD',
  headline: 'A low-key giant from Detroit with a presence that carries the room —',
  headlineAccent: 'and the label.',
  body: [
    block('Cleveland L. Hurd has always been known for his low-key personality, even though he towers over most people at 6\'5ft tall. His presence is as commanding in person as it is on stage.'),
    block(
      'The late, great ', ['Big Proof', [B]], ', of multi-platinum status and ', ['D12', [B]],
      ' fame, placed him at the helm of his label ', ['Iron Fist Records', [B]],
      ' because of his unique and impressive combination of leadership, and keen sense of business skills.',
    ),
    block(
      'As an artist, he is known to the world as ', ['1stBorn', [B]], ' — appearing in videos including ',
      ['Eminem\'s "Toy Soldiers,"', [I]], ' ', ['D12\'s "Fight Music,"', [I]], ' ',
      ['Big Proof\'s "Gurls Wit da BOOM,"', [I]], ' ', ['Bizarre\'s "Hip Hop,"', [I]], ' and ',
      ['Obie Trice\'s "Cry Now."', [I]],
    ),
    block('Featured in ', ['Qd3\'s documentary ', [B]], ['BEEF', [B, I]], ', regularly aired on ', ['FUSE TV', [B]], '.'),
  ],
  quote: 'Low-key personality. Commanding presence. Detroit-born, Iron Fist-raised.',
  quoteSource: '— Press, on 1stBorn',
  stats: [
    { _key: 'st1', value: '6\'5', suffix: '"', label: 'Height', sub: 'Low-key giant' },
    { _key: 'st2', value: '5', suffix: '+', label: 'Music Videos', sub: 'Eminem · D12 · Obie Trice' },
    { _key: 'st3', value: '1', suffix: '', label: 'Label at the helm', sub: 'Iron Fist Records' },
    { _key: 'st4', value: 'FUSE', suffix: '', label: 'Featured doc', sub: 'Qd3\'s BEEF' },
  ],
  credits: [
    { _key: 'cr1', name: 'Eminem', role: 'Music Video', work: '"Toy Soldiers"' },
    { _key: 'cr2', name: 'D12', role: 'Music Video', work: '"Fight Music"' },
    { _key: 'cr3', name: 'Big Proof', role: 'Music Video · Label', work: '"Gurls Wit da BOOM"' },
    { _key: 'cr4', name: 'Bizarre', role: 'Music Video', work: '"Hip Hop"' },
    { _key: 'cr5', name: 'Obie Trice', role: 'Music Video', work: '"Cry Now"' },
  ],
  longStory: [
    block(
      'As CEO and Founder of Detroit\'s award winning rap group ', ['Purple G.A.N.G.', [B]],
      ', he is credited with touring nationally three times — twice with Eminem on his Anger Management tours featuring 50 Cent, Ludacris, Ras Kass, Mobb Deep, Papa Roach, MOP, Lil\' Jon, G Unit and Bone Crusha. He also opened for D12 on the D12 World Tour alongside Slum Village, Guilty Simpson, Black Milk, and Fat Killahz. He has opened shows for legendary acts including Souls of Mischief, Xzibit, MC Breed, Wu-Tang Clan, Bubba Sparxxx, Twista, and many others.',
    ),
    block(
      'As President of ', ['Iron Fist Global', [B]],
      ', he has been developing market strategies for artists such as Big Proof, JerkNation, Big Dame, Azizz, J Hill, Comedian Howie Bell, Spanky Hayes and DC\'s sensation Shif-T of Pretti Punk\'d.',
    ),
    block(
      '1stBorn made his debut with appearances on Big Proof\'s classic LPs ',
      ['"I Miss the Hip Hop Shop," "Searchin for Jerry Garcia," "Hand 2 Hand,"', [I]], ' and ',
      ['"Time A Tell"', [I]], ' (a collective effort written and recorded in 24hrs). He is also Co-Owner of ',
      ['The Original Hip Hop Shop', [B]], ' — dedicated to healing Detroit and surrounding communities through Hip-Hop.',
    ),
  ],
  tags: ['Hip-Hop', 'Boom Bap', 'Detroit', 'Iron Fist Records', 'Purple G.A.N.G.', 'D12', 'Eminem', 'Underground', '313'],
  links: [
    { _key: 'ln1', label: 'Facebook', url: 'https://www.facebook.com/1stbornmusic' },
    { _key: 'ln2', label: 'Instagram', url: 'https://www.instagram.com/1st_born313' },
    { _key: 'ln3', label: 'SoundCloud', url: 'https://soundcloud.com/1stbornmusic' },
    { _key: 'ln4', label: 'Email', url: 'mailto:alivestalive@gmail.com' },
  ],
};
