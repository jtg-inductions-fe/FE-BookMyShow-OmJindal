import { cva } from 'class-variance-authority';

/**
 * Defines the visual configurations for the Button component.
 */
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-lg font-medium font-inter transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'bg-gradient-to-r from-purple to-pink text-white opacity-85 hover:opacity-100',
        primary: 'bg-purple/90 text-white hover:bg-purple',
        secondary: 'bg-grey-bg text-primary border border-grey-border hover:bg-black/20',
        destructive: 'bg-error/80 text-white hover:bg-error',
        ghost:
          'hover:bg-muted hover:text-foreground dark:hover:bg-muted/50 aria-expanded:bg-muted aria-expanded:text-foreground',
        link: 'text-primary hover:underline',
        tertiary: 'text-pink hover:bg-pink/20',
        active: 'text-purple font-bold',
        'destructive-soft': 'bg-error/10 hover:bg-error/25 text-destructive',
        success: 'bg-success/20 text-green-700 hover:bg-success/30',
      },
      size: {
        default: 'h-11 px-12 py-4',
        sm: 'h-9 gap-1.5 px-4 py-2',
        md: 'h-10 gap-3 px-8 py-3',
        lg: 'h-15 gap-5 px-16 py-6',
        chip: 'px-3 py-1 rounded-full gap-1 text-sm',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);
