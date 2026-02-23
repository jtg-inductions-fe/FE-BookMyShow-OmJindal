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

/**
 * Extract id from slug
 */
export const getIdFromSlug = (slug: string): string => {
  const parts = slug.split('-');
  return parts[parts.length - 1];
};

/**
 * Extract name from slug
 */
export const getNameFromSlug = (slug: string): string => {
  const parts = slug.split('-');
  parts.pop();
  return parts.join(' ');
};
