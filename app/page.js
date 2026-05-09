import { client } from '../lib/sanity';
import { beatsQuery, collectionsQuery, videosQuery } from '../lib/queries';
import BeatStore from '../components/BeatStore';

export const revalidate = 60;

export default async function HomePage() {
  const [beats, collections, videos] = await Promise.all([
    client.fetch(beatsQuery),
    client.fetch(collectionsQuery),
    client.fetch(videosQuery),
  ]);
  return <BeatStore beats={beats} collections={collections} videos={videos} />;
}