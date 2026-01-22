import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib';

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'small';

const variantClasses = {
  h1: 'text-3xl font-bold lg:text-5xl',
  h2: 'text-3xl font-bold',
  h3: 'text-2xl font-semibold',
  h4: 'text-xl',
  h5: 'text-lg',
  h6: 'text-base font-semibold',
  p: 'text-base',
  small: 'text-sm font-medium',
};

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  as?: TypographyVariant;
  children: ReactNode;
}

export function Typography({ variant = 'p', as, className, children, ...props }: TypographyProps) {
  const Component = as || 'p';

  return (
    <Component className={cn(variantClasses[variant], className)} {...props}>
      {children}
    </Component>
  );
}
