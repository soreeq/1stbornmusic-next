// Fallback slider videos when no `legacy` document exists in Sanity, and the
// seed for that document.
export const LEGACY_DEFAULTS = {
  videos: ['0_8FtrLr1AE', 'Ewfj2DYzvbU', 'xqpCT9JEuMQ', 'DFSitiOrisY'].map(id => `https://www.youtube.com/watch?v=${id}`),
};
