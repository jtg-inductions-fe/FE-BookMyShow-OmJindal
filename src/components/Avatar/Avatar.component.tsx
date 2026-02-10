import type { ComponentProps } from 'react';

import { Fallback, Image, Root } from '@radix-ui/react-avatar';

import { cn } from '@/utils';

/**
 * Avatar container component.
 *
 * Uses `Radix` avatar root component and
 * size base styling using `size` attribute.
 */
export const Avatar = ({
  className,
  size = 'default',
  ...props
}: ComponentProps<typeof Root> & {
  size?: 'default' | 'sm' | 'lg';
}) => (
  <Root
    data-slot="avatar"
    data-size={size}
    className={cn(
      'group/avatar relative flex size-8 shrink-0 overflow-hidden rounded-full select-none data-[size=lg]:size-10 data-[size=sm]:size-6',
      className,
    )}
    {...props}
  />
);

/**
 * Avatar image component.
 *
 * Renders the image inside the avatar.
 */
export const AvatarImage = ({ className, ...props }: ComponentProps<typeof Image>) => (
  <Image data-slot="avatar-image" className={cn('aspect-square size-full', className)} {...props} />
);

/**
 * Avatar fallback component.
 *
 * Displayed when the avatar image fails to load
 * or is not provided.
 */
export const AvatarFallback = ({ className, ...props }: ComponentProps<typeof Fallback>) => (
  <Fallback
    data-slot="avatar-fallback"
    className={cn(
      'bg-muted text-muted-foreground flex size-full items-center justify-center rounded-full text-sm group-data-[size=sm]/avatar:text-xs',
      className,
    )}
    {...props}
  />
);
