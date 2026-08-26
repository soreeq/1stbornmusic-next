import crypto from 'crypto';

export const VAULT_COOKIE = 'vault_access';

function vaultCode() {
  return (process.env.VAULT_CODE || '').trim();
}

export function isValidCode(input) {
  const code = vaultCode();
  if (!code || typeof input !== 'string') return false;
  const a = Buffer.from(input.trim().toUpperCase());
  const b = Buffer.from(code.toUpperCase());
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export function accessCookieValue() {
  return crypto.createHash('sha256').update(`1stborn-vault:${vaultCode()}`).digest('hex');
}

export function isValidCookie(value) {
  return !!vaultCode() && !!value && value === accessCookieValue();
}
