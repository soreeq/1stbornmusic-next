// Computes a 240-point waveform for every beat that has none and stores it in
// Sanity (`beat.waveform`). Needs ffmpeg on PATH and SANITY_API_TOKEN (write).
//
//   npm run waveforms                  # beats without a waveform
//   npm run waveforms -- --force       # recompute all
//   npm run waveforms -- --only <id>   # a single beat
//   npm run waveforms -- --dry         # compute and print, write nothing
import { spawn } from 'node:child_process';
import { Readable } from 'node:stream';
import { createClient } from 'next-sanity';

const POINTS = 240;
const args = process.argv.slice(2);
const force = args.includes('--force');
const dry = args.includes('--dry');
const only = args.includes('--only') ? args[args.indexOf('--only') + 1] : null;

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function decodePcm(url) {
  const res = await fetch(url);
  if (!res.ok || !res.body) throw new Error(`download failed: HTTP ${res.status}`);
  return new Promise((resolve, reject) => {
    const ff = spawn('ffmpeg', ['-v', 'error', '-i', 'pipe:0', '-ac', '1', '-ar', '8000', '-f', 's16le', 'pipe:1']);
    const chunks = [];
    let stderr = '';
    ff.stdout.on('data', c => chunks.push(c));
    ff.stderr.on('data', c => { stderr += c; });
    ff.stdin.on('error', () => {});
    ff.on('error', reject);
    ff.on('close', code => {
      const buf = Buffer.concat(chunks);
      if (code !== 0 || buf.length < 2) return reject(new Error(`ffmpeg exit ${code}: ${stderr.trim().slice(0, 200)}`));
      resolve(new Int16Array(buf.buffer, buf.byteOffset, Math.floor(buf.length / 2)));
    });
    Readable.fromWeb(res.body).pipe(ff.stdin);
  });
}

// Short-window RMS sampled at evenly spaced points. Averaging whole seconds
// flattens loud, compressed masters into a solid block; sampling 60 ms windows
// keeps the kick/snare rhythm visible, like a zoomed-out real waveform.
function toPeaks(samples) {
  const win = 480; // 60 ms at 8 kHz
  const raw = [];
  for (let i = 0; i < POINTS; i++) {
    const center = Math.floor(((i + 0.5) / POINTS) * samples.length);
    const start = Math.max(0, center - win / 2);
    const end = Math.min(samples.length, start + win);
    let sum = 0;
    for (let j = start; j < end; j++) {
      const v = samples[j] / 32768;
      sum += v * v;
    }
    raw.push(Math.sqrt(sum / Math.max(1, end - start)));
  }
  const sorted = [...raw].sort((a, b) => a - b);
  const at = q => sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * q))];
  const floor = at(0.05);
  const ref = Math.max(at(0.97) - floor, 1e-6);
  return raw.map(v => Math.max(6, Math.round(Math.min(1, Math.max(0, (v - floor) / ref)) * 100)));
}

const BLOCKS = '▁▂▃▄▅▆▇█';
const spark = peaks => {
  const step = peaks.length / 64;
  return Array.from({ length: 64 }, (_, i) => {
    const v = Math.max(...peaks.slice(Math.floor(i * step), Math.floor((i + 1) * step) || undefined));
    return BLOCKS[Math.min(BLOCKS.length - 1, Math.floor((v / 100) * BLOCKS.length))];
  }).join('');
};

const beats = await client.fetch(
  '*[_type == "beat" && !(_id in path("drafts.**"))]{ _id, title, "url": coalesce(audioFile.asset->url, audioSrc), "has": defined(waveform) && count(waveform) > 0 }',
);
const todo = beats.filter(b => b.url && (only ? b._id === only : force || !b.has));
console.log(`${beats.length} beats, ${todo.length} to process${dry ? ' (dry run)' : ''}`);

let ok = 0;
const failed = [];
for (const [i, b] of todo.entries()) {
  try {
    const peaks = toPeaks(await decodePcm(b.url));
    const avg = Math.round(peaks.reduce((s, v) => s + v, 0) / peaks.length);
    console.log(`[${i + 1}/${todo.length}] ${b.title.trim()}: min ${Math.min(...peaks)} avg ${avg} max ${Math.max(...peaks)}`);
    console.log('   ' + spark(peaks));
    if (!dry) await client.patch(b._id).set({ waveform: peaks }).commit();
    ok++;
  } catch (e) {
    failed.push(b.title.trim());
    console.log(`[${i + 1}/${todo.length}] ${b.title.trim()}: FAILED — ${e.message}`);
  }
}
console.log(`done: ${ok} ok, ${failed.length} failed${failed.length ? ' (' + failed.join(', ') + ')' : ''}`);
