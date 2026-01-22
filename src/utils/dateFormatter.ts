import dayjs from 'dayjs';

/**
 * Formats a given date string.
 *
 * @param {string} val - The date string to be formatted. This can be any string parseable by Day.js (e.g., 'YYYY-MM-DD').
 * @param {string} format - The desired output format string, following Day.js format tokens (e.g., 'YYYY-MM-DD', 'MM/DD/YYYY HH:mm', 'dddd, MMMM D, YYYY').
 * @returns {string} The formatted date string.
 */
export const dateFormatter = (val: string, format: string): string => dayjs(val).format(format);
