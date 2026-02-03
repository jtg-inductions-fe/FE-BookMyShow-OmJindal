import { cn } from '@/utils';

import { TypographyVariants } from './Typography.styles';
import type { TypographyProps } from './Typography.types';

/**
 * A polymorphic Typography component that provides a consistent styles
 * for text elements while maintaining semantic HTML structure.
 * @example
 * <Typography tag="h1">Main Title</Typography>
 * // Renders an <h1> tag with h1 styling
 * @example
 * <Typography size="h3" tag="p">Subtitle text</Typography>
 * // Renders a <p> tag that visually looks like an h3
 * @param props - {@link TypographyProps}
 */
export function Typography({
  tag = 'p',
  size = tag,
  variant = 'primary',
  className,
  children,
}: TypographyProps) {
  const Component = tag;

  return (
    <Component className={cn(TypographyVariants({ variant, size }), className)}>
      {children}
    </Component>
  );
}
