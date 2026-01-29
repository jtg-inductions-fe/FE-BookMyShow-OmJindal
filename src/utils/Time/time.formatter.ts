import { TimeConfig } from './time.config';
import type { TimeFormatTypes } from './time.types';

/**
 * Converts a datetime string into a localised time format.
 * @param datetime - The datetime string to be formatted.
 * @param format - A valid time pattern string from {@link TimeFormatTypes}. Default to `HHMM A`.
 * @returns A formatted time string.
 * @example
 * timeFormatter('2026-01-01T06:30:00Z');
 * // Returns "12:00 PM"
 */
export const timeFormatter = (datetime: string, format: TimeFormatTypes = 'HHMM A'): string => {
  const dateObj = new Date(datetime);
  if (isNaN(dateObj.getTime())) {
    return '';
  }
  return new Intl.DateTimeFormat(TimeConfig[format].locale, TimeConfig[format].options)
    .format(dateObj)
    .toLocaleUpperCase(TimeConfig[format].locale);
};
