import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import type { LinkProps } from 'react-router';

import type { TypographyVariants } from '../Typography';

/**
 * Props for NavigationLink component
 *
 * Extends react router `LinkProps` and native
 * `a` element props along with `TypographyVariants`.
 */
export type NavigationLinkProps = LinkProps &
  ComponentProps<'a'> &
  VariantProps<typeof TypographyVariants>;
