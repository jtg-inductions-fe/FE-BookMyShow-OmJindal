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
      tertiary: 'text-pink',
      placeholder: 'text-secondary/75',
    },
    variant: {
      h1: 'text-3xl font-bold lg:text-5xl ',
      h2: 'text-2xl font-bold md:text-3xl',
      h3: 'text-2xl font-semibold',
      h4: 'text-xl',
      h5: 'text-lg',
      h6: 'text-base font-semibold',
      p: 'text-base',
      span: 'text-base',
      small: 'text-sm',
      a: 'text-base font-semibold hover:underline',
    },
    lineClamp: {
      1: 'line-clamp-1',
      2: 'line-clamp-2',
      3: 'line-clamp-3',
    },
    truncate: {
      1: 'truncate',
    },
  },
  defaultVariants: {
    color: 'primary',
    variant: 'p',
  },
});
