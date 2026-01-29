import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

import { buttonVariants } from './Button.styles';

/**
 * Props for the Button component.
 * Combines native button attributes, CVA variants, and the Radix asChild pattern.
 */
export type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    /**
     * If true, the button will render as immediate child.
     * Useful for nesting components like Links inside the button styling.
     * @default false
     */
    asChild?: boolean;
  };
