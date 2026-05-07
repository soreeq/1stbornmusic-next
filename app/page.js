import { client } from '../lib/sanity';
import { beatsQuery } from '../lib/queries';
import BeatStore from '../components/BeatStore';

export const revalidate = 60;

export default async function HomePage() {
  const beats = await client.fetch(beatsQuery);
  return <BeatStore beats={beats} />;
}