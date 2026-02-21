import { REGEX } from '@/constants';

/**
 * Helper function to generate slug of a given string.
 */
export const slugGenerator = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(REGEX.SLUG_INVALID_CHARS, '')
    .replace(REGEX.SLUG_WHITESPACE, '-');
