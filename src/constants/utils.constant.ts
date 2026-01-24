/**
 * The default locale used for date formatting.
 */
export const DEFAULT_LOCALE: Intl.LocalesArgument = 'en-IN';

/**
 * The default date configuration for the `Intl.DateTimeFormat` object.
 */
export const DEFAULT_DATE_FORMATTER_OPTIONS: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
} as const;

/**
 * The default configuration for the `Intl.NumberFormat` object.
 */
export const DEFAULT_AMOUNT_FORMATTER_OPTIONS: Intl.NumberFormatOptions = {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 2,
} as const;

/**
 * The default time configuration for the `Intl.DateTimeFormat` object.
 */
export const DEFAULT_TIME_FORMATTER_OPTIONS: Intl.DateTimeFormatOptions = {
  hour: '2-digit',
  minute: '2-digit',
  hour12: true,
} as const;
