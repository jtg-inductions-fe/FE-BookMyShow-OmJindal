import type { DateConfigTypes, DateFormatTypes } from './date.types';

/**
 * Maps date formats to their respective date
 * configuration object.
 */
export const DateConfig = {
  DDMMYY: {
    locale: 'en-IN',
    options: {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    },
  },
  'MMM DD': {
    locale: 'en-IN',
    options: {
      month: 'short',
      day: 'numeric',
    },
  },
} satisfies Record<DateFormatTypes, DateConfigTypes>;
