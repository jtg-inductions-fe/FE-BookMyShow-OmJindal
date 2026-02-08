import type { VariantProps } from 'class-variance-authority';

import { cn } from '@/utils';

import { emptyMediaVariants } from './Empty.styles';

/**
 * The main container of the empty component.
 */
export const Empty = ({ className, ...props }: React.ComponentProps<'div'>) => (
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
export const EmptyHeader = ({ className, ...props }: React.ComponentProps<'div'>) => (
  <div
    data-slot="empty-header"
    className={cn('flex max-w-sm flex-col items-center gap-3 text-center', className)}
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
}: React.ComponentProps<'div'> & VariantProps<typeof emptyMediaVariants>) => (
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
export const EmptyFooter = ({ className, ...props }: React.ComponentProps<'div'>) => (
  <div
    data-slot="empty-content"
    className={cn(
      'flex flex-col sm:flex-row w-full max-w-sm min-w-0 items-center gap-4 text-balance *:w-full sm:*:w-auto',
      className,
    )}
    {...props}
  />
);
