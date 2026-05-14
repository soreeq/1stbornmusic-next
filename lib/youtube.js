const CHANNEL_ID = 'UCJW7mraTRgSqFDImNwFjw-w';
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

export async function getChannelVideos() {
  try {
    const res = await fetch(RSS_URL, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const xml = await res.text();

    const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)];
    return entries.map(([, entry]) => {
      const videoId  = (entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)  || [])[1] || '';
      const title    = (entry.match(/<title>([^<]+)<\/title>/)             || [])[1] || '';
      const thumb    = (entry.match(/url="(https:\/\/i\.ytimg[^"]+)"/)     || [])[1] || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
      return { videoId, title: title.replace(/&amp;/g, '&'), thumb };
    }).filter(v => v.videoId);
  } catch {
    return [];
  }
}