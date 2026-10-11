export const CURRENCY = 'USD';

const REVOLUT_ME = (process.env.REVOLUT_ME_URL || 'https://revolut.me/clevelcx5z').replace(/\/$/, '');

export function buildPayUrl(total, orderCode) {
  const params = new URLSearchParams({
    amount: String(Math.round(total * 100)),
    currency: CURRENCY,
    note: orderCode,
  });
  return `${REVOLUT_ME}?${params}`;
}
