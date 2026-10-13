const YOUTUBE = /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/))([\w-]{11})/;

// Accepts a YouTube link in any common form, or a bare 11-character id.
export function youtubeId(input = '') {
  const s = String(input).trim();
  const m = s.match(YOUTUBE);
  if (m) return m[1];
  return /^[\w-]{11}$/.test(s) ? s : null;
}
