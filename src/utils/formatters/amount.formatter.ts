import { DEFAULT_AMOUNT_FORMATTER_OPTIONS, DEFAULT_LOCALE } from '@/constants';

/**
 * Converts a number to indian currency format.
 * @param num - The number to be formatted.
 * @param locale - A string with a BCP 47 language tag. Defaults to {@link DEFAULT_LOCALE}.
 * @param options - A configuration object for amount formatting. Defaults to {@link DEFAULT_AMOUNT_FORMATTER_OPTIONS}.
 * @returns A formatted amount string.
 * @example
 * amountFormatter(1000);
 * // Returns "₹1,000.00"
 */
export const amountFormatter = (
  num: number,
  locale: Intl.LocalesArgument = DEFAULT_LOCALE,
  options: Intl.NumberFormatOptions = DEFAULT_AMOUNT_FORMATTER_OPTIONS,
) => new Intl.NumberFormat(locale, options).format(num);
