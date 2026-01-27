import { DEFAULT_DATE_FORMATTER_OPTIONS, DEFAULT_LOCALE } from '@/constants';

/**
 * Converts a date string into a localised date format.
 * @param date - The date string to be formatted.
 * @param locale - A string with a BCP 47 language tag. Defaults to {@link DEFAULT_LOCALE}.
 * @param options - A configuration object for date formatting. Defaults to {@link DEFAULT_DATE_FORMATTER_OPTIONS}.
 * @returns A formatted date string.
 * @example
 * dateFormatter('2026-01-24');
 * // Returns "24 Jan, 2026"
 */
export const dateFormatter = (
  date: string,
  locale: Intl.LocalesArgument = DEFAULT_LOCALE,
  options: Intl.DateTimeFormatOptions = DEFAULT_DATE_FORMATTER_OPTIONS,
): string => {
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) {
    return '';
  }
  return new Intl.DateTimeFormat(locale, options).format(dateObj);
};
