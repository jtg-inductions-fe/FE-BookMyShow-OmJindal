/**
 * Formats a numeric value into a human-readable compact string.
 * @param {number} val - The numeric value to format.
 * @returns {string} A formatted string.
 * @example
 * numberFormatter(500);       // "500"
 * numberFormatter(1500);      // "1.5K"
 * numberFormatter(1000000);   // "1M"
 */
export const numberFormatter = (val: number): string => {
  if (!Number.isFinite(val)) {
    return String(val);
  }

  return new Intl.NumberFormat('en', {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 1,
  }).format(val);
};
