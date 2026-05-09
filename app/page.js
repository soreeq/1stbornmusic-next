import { client } from '../lib/sanity';
import { beatsQuery, collectionsQuery } from '../lib/queries';
import BeatStore from '../components/BeatStore';

export const revalidate = 60;

export default async function HomePage() {
  const [beats, collections] = await Promise.all([
    client.fetch(beatsQuery),
    client.fetch(collectionsQuery),
  ]);
  return <BeatStore beats={beats} collections={collections} />;
}