import type { HTMLAttributes, ReactNode } from 'react';

/**
 * Valid HTML tags supported by the Typography component for semantic rendering.
 */
export type TypographyTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'small' | 'span';

/**
 * Props for the Typography component.
 * Extends standard HTML attributes to ensure full compatibility with native props like `className`, `aria-label`, etc.
 */
export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  /**
   * Defines the visual style of the text.
   */
  variant?: TypographyTag;
  /**
   * Determines the HTML element to be rendered.
   */
  as?: TypographyTag;
  /**
   * The content to be rendered within the typography component.
   */
  children: ReactNode;
}
