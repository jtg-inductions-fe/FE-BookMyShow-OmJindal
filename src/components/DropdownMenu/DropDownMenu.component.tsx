import type { ComponentProps } from 'react';

import {
  Content,
  Group,
  Item,
  Portal,
  Root,
  Separator,
  Trigger,
} from '@radix-ui/react-dropdown-menu';

import { cn } from '@/utils';

/**
 * Root dropdown menu component.
 */
export const DropdownMenu = ({ ...props }: ComponentProps<typeof Root>) => (
  <Root data-slot="dropdown-menu" {...props} />
);

/**
 * Dropdown menu trigger component.
 *
 * The element that toggles the menu open and close.
 */
export const DropdownMenuTrigger = ({ ...props }: ComponentProps<typeof Trigger>) => (
  <Trigger data-slot="dropdown-menu-trigger" {...props} />
);

/**
 * Dropdown menu content container.
 *
 * Renders inside a portal and handles positioning,
 * animations.
 */
export const DropdownMenuContent = ({
  className,
  sideOffset = 4,
  ...props
}: ComponentProps<typeof Content>) => (
  <Portal>
    <Content
      data-slot="dropdown-menu-content"
      sideOffset={sideOffset}
      className={cn(
        'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-32 origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md',
        className,
      )}
      {...props}
    />
  </Portal>
);

/**
 * Dropdown menu group component.
 *
 * Used to group related menu items.
 */
export const DropdownMenuGroup = ({ ...props }: ComponentProps<typeof Group>) => (
  <Group data-slot="dropdown-menu-group" {...props} />
);

/**
 * Dropdown menu item component.
 *
 * Supports visual variants.
 */
export const DropdownMenuItem = ({
  className,
  inset,
  variant = 'default',
  ...props
}: ComponentProps<typeof Item> & {
  inset?: boolean;
  variant?: 'default' | 'destructive';
}) => (
  <Item
    data-slot="dropdown-menu-item"
    data-inset={inset}
    data-variant={variant}
    className={cn(
      "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:text-destructive! [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-inset:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
      className,
    )}
    {...props}
  />
);

/**
 * Dropdown menu separator component.
 *
 * Provides a visual divider between sections.
 */
export const DropdownMenuSeparator = ({
  className,
  ...props
}: ComponentProps<typeof Separator>) => (
  <Separator
    data-slot="dropdown-menu-separator"
    className={cn('bg-border -mx-1 my-1 h-px', className)}
    {...props}
  />
);
