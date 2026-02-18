import { Link } from 'react-router';

import { TypographyVariants } from '@/components/Typography';
import { cn } from '@/utils';

import type { NavigationLinkProps } from './NavigationLink.types';

/**
 * NavigationLink component.
 *
 * A styled wrapper around React Router’s `Link` component.
 */
export const NavigationLink = ({
  to,
  className,
  children,
  color = 'tertiary',
  variant = 'a',
  ...props
}: NavigationLinkProps) => (
  <Link to={to} className={cn(TypographyVariants({ color, variant }), className)} {...props}>
    {children}
  </Link>
);
