import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import type { LinkProps } from 'react-router';

import { buttonVariants } from './Button.styles';

/**
 * Props for the Button component.
 *
 * It can render either as a native HTML `button` or
 * a React Router `Link` when `asLink:true`
 */
export type ButtonProps = VariantProps<typeof buttonVariants> &
  (
    | ({
        asLink: true;
      } & LinkProps)
    | ({
        asLink?: false;
      } & ComponentProps<'button'>)
  );
