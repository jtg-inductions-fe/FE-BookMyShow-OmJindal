import type { ComponentProps } from 'react';
import type { LinkProps } from 'react-router';
import { Link } from 'react-router';

import { cn } from '@/utils/index';

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
