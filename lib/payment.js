export const CURRENCY = 'USD';

// Personal revolut.me links cannot carry an amount or note — the payer types both.
export const PAY_URL = (process.env.REVOLUT_ME_URL || 'https://revolut.me/clevelcx5z').replace(/\/$/, '');
