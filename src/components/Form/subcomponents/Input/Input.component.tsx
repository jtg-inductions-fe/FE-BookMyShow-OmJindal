import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

import { cn } from '@/utils';

import { inputGroupAddonVariants } from './Input.styles';

/**
 * Base input component.
 *
 * Wraps a native `<input>` element and applies consistent
 * styling, focus states, and validation feedback.
 */
export const Input = ({ className, type, ...props }: ComponentProps<'input'>) => (
  <input
    type={type}
    data-slot="input"
    className={cn(
      'mt-1 file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-fit rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
      'focus-visible:border-ring focus-visible:ring-ring focus-visible:ring-2',
      'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive placeholder:text-sm',
      className,
    )}
    {...props}
  />
);

/**
 * InputGroup component.
 *
 * Acts as a container for inputs.
 */
export const InputGroup = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    data-slot="input-group"
    role="group"
    className={cn(
      'group/input-group border-input dark:bg-input/30 relative flex w-fit items-center rounded-md border shadow-xs transition-[color,box-shadow] outline-none',
      'h-9 min-w-0 has-[>textarea]:h-auto',

      // Variants based on alignment.
      'has-[>[data-align=inline-start]]:[&>input]:pl-2',
      'has-[>[data-align=inline-end]]:[&>input]:pr-2',
      'has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-start]]:[&>input]:pb-3',
      'has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-end]]:[&>input]:pt-3',

      // Focus state.
      'has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-ring has-[[data-slot=input-group-control]:focus-visible]:ring-2',

      // Error state.
      'has-[[data-slot][aria-invalid=true]]:ring-destructive/20 has-[[data-slot][aria-invalid=true]]:border-destructive dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40',

      className,
    )}
    {...props}
  />
);

/**
 * InputGroupAddon component.
 *
 * Used for icons that accompany
 * an input inside an `InputGroup`.
 */
export const InputGroupAddon = ({
  className,
  align = 'inline-start',
  ...props
}: ComponentProps<'button'> & VariantProps<typeof inputGroupAddonVariants>) => (
  <button
    type="button"
    data-slot="input-group-addon"
    data-align={align}
    className={cn(inputGroupAddonVariants({ align }), className)}
    {...props}
  />
);

/**
 * InputGroupInput component.
 *
 * A specialized input meant to be used inside `InputGroup`.
 */
export const InputGroupInput = ({ className, ...props }: ComponentProps<'input'>) => (
  <Input
    data-slot="input-group-control"
    className={cn(
      'w-full rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0 dark:bg-transparent',
      className,
    )}
    {...props}
  />
);
