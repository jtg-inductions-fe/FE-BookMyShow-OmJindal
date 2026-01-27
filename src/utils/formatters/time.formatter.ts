import { DEFAULT_LOCALE, DEFAULT_TIME_FORMATTER_OPTIONS } from '@/constants';

/**
 * Converts a datetime string into a localised time format.
 * @param datetime - The datetime string to be formatted.
 * @param locale - A string with a BCP 47 language tag. Defaults to {@link DEFAULT_LOCALE}.
 * @param options - A configuration object for time formatting. Defaults to {@link DEFAULT_TIME_FORMATTER_OPTIONS}.
 * @returns A formatted time string.
 * @example
 * timeFormatter('2026-01-01T06:30:00Z');
 * // Returns "12:00 PM"
 */
export const timeFormatter = (
  datetime: string,
  locale: Intl.LocalesArgument = DEFAULT_LOCALE,
  options: Intl.DateTimeFormatOptions = DEFAULT_TIME_FORMATTER_OPTIONS,
): string => {
  const dateObj = new Date(datetime);
  if (isNaN(dateObj.getTime())) {
    return '';
  }
  return new Intl.DateTimeFormat(locale, options).format(dateObj).toLocaleUpperCase(locale);
};
