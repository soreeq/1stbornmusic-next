// Run: SANITY_TOKEN=xxx node scripts/seed-beats.js
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const BASE = 'https://soulmanager.pl';

const beats = [
  { title:'Heavy Hitta',          audioSrc:`${BASE}/beats/Heavy%20Hitta%201055.mp3`,                          bpm:105, key:'Dm',  tags:['Hard','Detroit'],        isNew:true,  isFeatured:true,  plays:15400 },
  { title:'The Ave feat. 50',     audioSrc:`${BASE}/beats/TheAve%20feat%2050.mp3`,                             bpm:95,  key:'Am',  tags:['Hip-Hop','Classic'],     isNew:true,  isFeatured:true,  plays:12800 },
  { title:'4 My People',          audioSrc:`${BASE}/beats/4MyPeople-ScorpioTaurus.mp3`,                        bpm:90,  key:'Fm',  tags:['Boom Bap','Detroit'],    isNew:false, isFeatured:true,  plays:8200  },
  { title:'4 da Gangstaz',        audioSrc:`${BASE}/beats/4daGangstaz.mp3`,                                    bpm:98,  key:'Gm',  tags:['Hard','Underground'],    isNew:false, isFeatured:true,  plays:6700  },
  { title:'6031 HP',              audioSrc:`${BASE}/beats/6031HP_1.mp3`,                                       bpm:100, key:'Em',  tags:['Detroit','Cinematic'],   isNew:false, isFeatured:true,  plays:5900  },
  { title:'Checkmate',            audioSrc:`${BASE}/beats/Checkmate%20-Circles.mp3`,                           bpm:88,  key:'Bm',  tags:['Boom Bap','Underground'],isNew:false, isFeatured:true,  plays:4800  },
  { title:'Cowboy',               audioSrc:`${BASE}/beats/Cowboy-%20New%20Moon.mp3`,                           bpm:92,  key:'Am',  tags:['Cinematic','Hard'],      isNew:false, isFeatured:false, plays:4200  },
  { title:'Destine 4 Greatness',  audioSrc:`${BASE}/beats/Destine4Greatness-%20NeMani.mp3`,                    bpm:93,  key:'Dm',  tags:['Hip-Hop','Detroit'],     isNew:false, isFeatured:false, plays:3900  },
  { title:'Everything We',        audioSrc:`${BASE}/beats/Everything%20We.mp3`,                                bpm:85,  key:'Cm',  tags:['Lo-fi','Dark'],          isNew:false, isFeatured:false, plays:3500  },
  { title:'For Destiny',          audioSrc:`${BASE}/beats/For%20Destiny.mp3`,                                  bpm:87,  key:'F#m', tags:['Cinematic','Detroit'],   isNew:false, isFeatured:false, plays:3200  },
  { title:'H8 Dat Shiz',          audioSrc:`${BASE}/beats/H8DatShiz-StrawberryMoon.mp3`,                       bpm:96,  key:'Gm',  tags:['Hard','Battle Rap'],     isNew:false, isFeatured:false, plays:2900  },
  { title:'Hip Hop Lives Matter', audioSrc:`${BASE}/beats/Hip%20Hop%20Lives%20Matter%20-%20ScorpioTaurus.mp3`, bpm:90,  key:'Am',  tags:['Hip-Hop','Detroit'],     isNew:false, isFeatured:false, plays:5100  },
  { title:'No Cap',               audioSrc:`${BASE}/beats/No%20capp%20-%20ScorpTaur.mp3`,                      bpm:98,  key:'Em',  tags:['Hard','Underground'],    isNew:false, isFeatured:false, plays:2700  },
  { title:'Own It',               audioSrc:`${BASE}/beats/Own%20It.mp3`,                                       bpm:100, key:'Dm',  tags:['Boom Bap','Detroit'],    isNew:false, isFeatured:false, plays:2400  },
  { title:'Pushn W8ght',          audioSrc:`${BASE}/beats/PushnW8ght-Str8Goat.mp3`,                            bpm:95,  key:'Bm',  tags:['Hard','Detroit'],        isNew:false, isFeatured:false, plays:2200  },
  { title:'Scorpio Theme',        audioSrc:`${BASE}/beats/ScorpioTheme.mp3`,                                   bpm:88,  key:'Cm',  tags:['Cinematic','Dark'],      isNew:false, isFeatured:false, plays:2000  },
  { title:'Smoke Erthang',        audioSrc:`${BASE}/beats/Smoke%20Erthang%20-%20Bd.mp3`,                       bpm:93,  key:'Am',  tags:['Lo-fi','Underground'],   isNew:false, isFeatured:false, plays:1800  },
  { title:'Supreme',              audioSrc:`${BASE}/beats/Supreme1xBackdoor.mp3`,                               bpm:102, key:'Fm',  tags:['Hard','Battle Rap'],     isNew:false, isFeatured:false, plays:1600  },
  { title:'Thass It Again',       audioSrc:`${BASE}/beats/Thass%20it%20again.mp3`,                             bpm:97,  key:'Gm',  tags:['Boom Bap','Detroit'],    isNew:false, isFeatured:false, plays:1400  },
  { title:'X',                    audioSrc:`${BASE}/beats/X%20-%20Bd.mp3`,                                     bpm:105, key:'Em',  tags:['Dark','Cinematic'],      isNew:false, isFeatured:false, plays:1200  },
  { title:'05',                   audioSrc:`${BASE}/beats/05.mp3`,                                              bpm:93,  key:'Am',  tags:['Detroit','Underground'], isNew:true,  isFeatured:false, plays:0     },
  { title:'Blue Lotus',           audioSrc:`${BASE}/beats/Blue%20lotus%20.mp3`,                                bpm:88,  key:'Cm',  tags:['Lo-fi','Dark'],          isNew:true,  isFeatured:false, plays:0     },
  { title:'Classic',              audioSrc:`${BASE}/beats/Classic%20-%20Bd.mp3`,                               bpm:95,  key:'Dm',  tags:['Boom Bap','Detroit'],    isNew:true,  isFeatured:false, plays:0     },
  { title:'Da Howlin',            audioSrc:`${BASE}/beats/DaHowlin%20-%20FullmoonWolves.mp3`,                  bpm:98,  key:'Gm',  tags:['Hard','Dark'],           isNew:true,  isFeatured:false, plays:0     },
  { title:'I Am Legend',          audioSrc:`${BASE}/beats/IamLegend-Power.mp3`,                                bpm:100, key:'Em',  tags:['Cinematic','Detroit'],   isNew:true,  isFeatured:false, plays:0     },
  { title:'Im Everything',        audioSrc:`${BASE}/beats/ImEvrything-WinterSol.mp3`,                          bpm:90,  key:'Am',  tags:['Hip-Hop','Detroit'],     isNew:true,  isFeatured:false, plays:0     },
  { title:'July 9th',             audioSrc:`${BASE}/beats/July%209th%20-%20Bd.mp3`,                            bpm:87,  key:'Fm',  tags:['Lo-fi','Dark'],          isNew:true,  isFeatured:false, plays:0     },
  { title:'Keep Pushin',          audioSrc:`${BASE}/beats/KeePushin%20-%20Bd.mp3`,                             bpm:96,  key:'Bm',  tags:['Hard','Underground'],    isNew:true,  isFeatured:false, plays:0     },
  { title:'Leo N Rising',         audioSrc:`${BASE}/beats/Leo%20N%20Rising.mp3`,                               bpm:92,  key:'Dm',  tags:['Cinematic','Detroit'],   isNew:true,  isFeatured:false, plays:0     },
  { title:'Luv U',                audioSrc:`${BASE}/beats/Luv%20u%20-%20ScorpioTaurus.mp3`,                    bpm:85,  key:'Cm',  tags:['Lo-fi','Dark'],          isNew:true,  isFeatured:false, plays:0     },
  { title:'Magic Is Key',         audioSrc:`${BASE}/beats/Magic%20Is%20Key%20.mp3`,                            bpm:90,  key:'Am',  tags:['Hip-Hop','Cinematic'],   isNew:true,  isFeatured:false, plays:0     },
  { title:'Mo Keys',              audioSrc:`${BASE}/beats/Mo%20keys%20-%20Bd.mp3`,                             bpm:102, key:'Fm',  tags:['Hard','Detroit'],        isNew:true,  isFeatured:false, plays:0     },
  { title:'Mobbway',              audioSrc:`${BASE}/beats/Mobbway-Thermal%20.mp3`,                             bpm:98,  key:'Gm',  tags:['Hard','Underground'],    isNew:true,  isFeatured:false, plays:0     },
  { title:'New Manifest',         audioSrc:`${BASE}/beats/NewManifest.mp3`,                                    bpm:93,  key:'Em',  tags:['Detroit','Cinematic'],   isNew:true,  isFeatured:false, plays:0     },
  { title:'Oochie Coo',           audioSrc:`${BASE}/beats/Oochie%20coo-Power.mp3`,                             bpm:95,  key:'Dm',  tags:['Boom Bap','Detroit'],    isNew:true,  isFeatured:false, plays:0     },
  { title:'Subteraneous',         audioSrc:`${BASE}/beats/Subteraneous-Landr.mp3`,                             bpm:88,  key:'Bm',  tags:['Underground','Dark'],    isNew:true,  isFeatured:false, plays:0     },
  { title:'Switch',               audioSrc:`${BASE}/beats/Switch-.mp3`,                                        bpm:97,  key:'Am',  tags:['Hard','Detroit'],        isNew:true,  isFeatured:false, plays:0     },
  { title:'The Con Way',          audioSrc:`${BASE}/beats/TheCon%20Way-Circles.mp3`,                           bpm:91,  key:'Cm',  tags:['Boom Bap','Underground'],isNew:true,  isFeatured:false, plays:0     },
  { title:'WYPAU',                audioSrc:`${BASE}/beats/WYPAU-FullMW.mp3`,                                   bpm:100, key:'Gm',  tags:['Hard','Cinematic'],      isNew:true,  isFeatured:false, plays:0     },
];

const PRICES = { mp3:29, wav:49, trackout:99, unlimited:149, exclusive:299 };

async function seed() {
  console.log(`Seeding ${beats.length} beats...`);
  for (const b of beats) {
    const slug = b.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const doc = {
      _type: 'beat',
      title: b.title,
      slug: { _type: 'slug', current: slug },
      bpm: b.bpm,
      key: b.key,
      tags: b.tags,
      audioSrc: b.audioSrc,
      visibility: 'public',
      status: 'available',
      isNew: b.isNew,
      isFeatured: b.isFeatured,
      plays: b.plays,
      prices: { ...PRICES },
    };
    const result = await client.create(doc);
    console.log(`✓ ${b.title} (${result._id})`);
  }
  console.log('Done!');
}

seed().catch(console.error);
