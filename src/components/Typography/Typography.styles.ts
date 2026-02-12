import { cva } from 'class-variance-authority';

/**
 * Defines the visual configurations for the Typography component.
 */
export const TypographyVariants = cva('font-inter', {
  variants: {
    color: {
      default: 'text-white',
      primary: 'text-primary',
      secondary: 'text-secondary',
      pink: 'text-pink',
    },
    variant: {
      h1: 'text-3xl font-bold lg:text-5xl ',
      h2: 'text-3xl font-bold',
      h3: 'text-2xl font-semibold',
      h4: 'text-xl',
      h5: 'text-lg',
      h6: 'text-base font-semibold',
      p: 'text-base',
      span: 'text-base',
      small: 'text-sm font-medium',
      a: 'text-base font-semibold hover:underline',
    },
  },
  defaultVariants: {
    color: 'primary',
    variant: 'p',
  },
});
