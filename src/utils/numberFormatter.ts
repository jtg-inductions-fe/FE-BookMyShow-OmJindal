/**
 * Formats a number to a shortened string representation using 'k' for thousands or 'M' for millions.
 * Numbers less than 10000 are returned as it is.
 *
 * @param {number} val The numeric value to format.
 * @returns {string} The formatted number string
 */
export const numberFormatter = (val: number): string => {
  if (val >= 1000000) {
    return `${Math.floor(val / 1000000)}M`;
  } else if (val >= 10000) {
    return `${Math.floor(val / 1000)}k`;
  } else {
    return `${val}`;
  }
};
