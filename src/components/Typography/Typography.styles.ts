import type { TypographyTag } from './Typography.types';

/**
 * A mapping of typography variants to their respective Tailwind CSS utility classes.
 * Ensures consistent font sizes, weights, and families across the application.
 */
export const typographyClasses: Record<TypographyTag, string> = {
  h1: 'text-3xl font-bold lg:text-5xl font-inter',
  h2: 'text-3xl font-bold font-inter',
  h3: 'text-2xl font-semibold font-inter',
  h4: 'text-xl font-inter',
  h5: 'text-lg font-inter',
  h6: 'text-base font-semibold font-inter',
  p: 'text-base font-inter',
  span: 'text-base font-inter',
  small: 'text-sm font-medium font-inter',
} as const;
