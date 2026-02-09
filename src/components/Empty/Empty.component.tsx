import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

import { cn } from '@/utils';

import { emptyMediaVariants } from './Empty.styles';

/**
 * The main container of the empty component.
 */
export const Empty = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    data-slot="empty"
    className={cn(
      'flex flex-col items-center justify-center gap-5 rounded-lg text-center text-balance p-4 sm:p-8',
      className,
    )}
    {...props}
  />
);

/**
 * The header of the empty component.
 */
export const EmptyHeader = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    data-slot="empty-header"
    className={cn('flex max-w-lg flex-col items-center gap-3 text-center', className)}
    {...props}
  />
);

/**
 * The media icon container of the empty component.
 */
export const EmptyMedia = ({
  className,
  variant = 'default',
  ...props
}: ComponentProps<'div'> & VariantProps<typeof emptyMediaVariants>) => (
  <div
    data-slot="empty-icon"
    data-variant={variant}
    className={cn(emptyMediaVariants({ variant, className }))}
    {...props}
  />
);

/**
 * The footer of the empty component.
 */
export const EmptyContent = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    data-slot="empty-content"
    className={cn(
      'flex flex-col justify-center sm:flex-row w-full min-w-0 items-center gap-4 text-balance *:w-full sm:*:w-auto',
      className,
    )}
    {...props}
  />
);
