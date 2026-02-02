import type { ComponentProps } from 'react';

import { cn } from '@/utils/index';

/**
 * Base Card container component.
 *
 * Provides a styled container for grouping related content.
 */
export const Card = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    data-slot="card"
    className={cn(
      'bg-white text-primary flex flex-col gap-5 rounded-xl border shadow-md p-10 mx-auto my-10 h-fit lg:min-w-md',
      className,
    )}
    {...props}
  />
);

/**
 * Card header section.
 *
 * Intended for titles, descriptions, images.
 */
export const CardHeader = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    data-slot="card-header"
    className={cn('flex flex-col items-center gap-4 text-center', className)}
    {...props}
  />
);

/**
 * Card content section.
 *
 * Holds the main body of the card.
 */
export const CardContent = ({ className, ...props }: ComponentProps<'div'>) => (
  <div data-slot="card-content" className={className} {...props} />
);

/**
 * Card footer section.
 *
 * Typically used for actions such as buttons or links.
 */
export const CardFooter = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    data-slot="card-footer"
    className={cn('text-center flex flex-row justify-center gap-0.5', className)}
    {...props}
  />
);
