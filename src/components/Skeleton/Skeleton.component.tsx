import type { ComponentProps } from 'react';

import { cn } from '@/utils';

/**
 * Skeleton is a loading placeholder component.
 *
 * It is typically used to represent the shape and layout of content
 * while data is being fetched.
 */
export const Skeleton = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    data-slot="skeleton"
    className={cn('bg-accent animate-pulse rounded-md h-full w-full', className)}
    {...props}
  />
);
