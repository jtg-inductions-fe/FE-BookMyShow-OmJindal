import { DateConfig } from './date.config';
import type { DateFormatTypes } from './date.types';

/**
 * Converts a date string into a localised date format.
 * @param date - The date string to be formatted.
 * @param format - A valid date pattern string from {@link DateFormatTypes}. Default to `DDMMYY`.
 * @returns A formatted date string.
 * @example
 * dateFormatter('2026-01-24');
 * // Returns "24 Jan 2026"
 */
export const dateFormatter = (date: string, format: DateFormatTypes = 'DDMMYY'): string => {
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) {
    return '';
  }
  return new Intl.DateTimeFormat(DateConfig[format].locale, DateConfig[format].options).format(
    dateObj,
  );
};
