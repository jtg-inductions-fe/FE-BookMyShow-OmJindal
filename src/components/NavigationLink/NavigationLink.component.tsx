import { Link } from 'react-router';

import { cn } from '@/utils';

import type { NavigationLinkProps } from './NavigationLink.types';
import { TypographyVariants } from '../Typography';

/**
 * NavigationLink component.
 *
 * A styled wrapper around React Router’s `Link` component.
 */
export const NavigationLink = ({
  to,
  className,
  children,
  color = 'primary',
  variant = 'a',
  ...props
}: NavigationLinkProps) => (
  <Link to={to} className={cn(TypographyVariants({ color, variant }), className)} {...props}>
    {children}
  </Link>
);
