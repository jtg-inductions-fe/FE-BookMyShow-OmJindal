import type { VariantProps } from 'class-variance-authority';
import type { HTMLAttributes, ReactNode } from 'react';
import type { LinkProps } from 'react-router';

import { TypographyVariants } from './Typography.styles';

/**
 * Valid HTML tags supported by the Typography component for semantic rendering.
 */
export type TypographyTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'small' | 'span' | 'a';

/**
 * Variant props for the Typography component.
 */
export type TypographyVariantProps = VariantProps<typeof TypographyVariants>;

/**
 * Props for the Typography component.
 *
 * Extends standard HTML attributes to ensure full compatibility with native
 * props like `className`, `aria-label`, etc.
 */
export type BaseTypographyProps = TypographyVariantProps &
  HTMLAttributes<HTMLElement> & {
    /**
     * The content to be rendered within the typography component.
     */
    children: ReactNode;
  };

/**
 * Props for the Typography component.
 */
export type TypographyProps = BaseTypographyProps &
  (
    | ({
        asLink: true;
      } & LinkProps)
    | {
        asLink?: false;
        /**
         * Determines the HTML element to be rendered.
         */
        tag?: TypographyTag;
      }
  );
