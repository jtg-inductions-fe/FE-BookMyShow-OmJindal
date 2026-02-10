import type { ComponentProps } from 'react';
import { Link, type LinkProps } from 'react-router';

import { cn } from '@/utils';

/**
 * NavigationLink component.
 *
 * A styled wrapper around React Router’s `Link` component.
 */
export const NavigationLink = ({
  to,
  className,
  children,
  ...props
}: LinkProps & ComponentProps<'a'>) => (
  <Link to={to} className={cn('text-pink font-inter font-semibold', className)} {...props}>
    {children}
  </Link>
);
