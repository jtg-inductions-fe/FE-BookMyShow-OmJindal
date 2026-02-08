import { cva } from 'class-variance-authority';

/**
 * Defines the visual configurations for the empty media icon component.
 */
export const emptyMediaVariants = cva(
  'flex shrink-0 items-center justify-center text-error [&_svg]:pointer-events-none [&_svg]:shrink-0 p-7 rounded-full',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        icon: "bg-muted size-10 shrink-0 items-center justify-center [&_svg:not([class*='size-'])]:size-6",
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);
