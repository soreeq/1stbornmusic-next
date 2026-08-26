import { cookies } from 'next/headers';
import { client } from '../../lib/sanity';
import { vaultBeatsQuery } from '../../lib/queries';
import { VAULT_COOKIE, isValidCookie, isValidCode } from '../../lib/vault';
import VaultExperience from '../../components/vault/VaultExperience';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'The Vault – 1stBornMusic',
  description: 'Reserved stock. Code holders only.',
  robots: { index: false, follow: false },
};

export default async function VaultPage({ searchParams }) {
  const [sp, cookieStore] = await Promise.all([searchParams, cookies()]);
  const key = typeof sp?.key === 'string' ? sp.key : null;
  const viaKey = key ? isValidCode(key) : false;
  const authorized = viaKey || isValidCookie(cookieStore.get(VAULT_COOKIE)?.value);

  const beats = authorized ? await client.fetch(vaultBeatsQuery) : [];

  return <VaultExperience authorized={authorized} beats={beats} keyToPersist={viaKey ? key : null} />;
}
