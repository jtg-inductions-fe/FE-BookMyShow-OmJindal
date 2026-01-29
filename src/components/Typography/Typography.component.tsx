import { cn } from '@/utils';

import { typographyClasses } from './Typography.styles';
import type { TypographyProps } from './Typography.types';

/**
 * A polymorphic Typography component that provides a consistent design system
 * for text elements while maintaining semantic HTML structure.
 * @example
 * <Typography variant="h1">Main Title</Typography>
 * // Renders an <h1> tag with h1 styling
 * @example
 * <Typography variant="h3" as="p">Subtitle text</Typography>
 * // Renders a <p> tag that visually looks like an h3
 * @param props - {@link TypographyProps}
 */
export const Typography = ({
  variant = 'p',
  as,
  className,
  children,
  ...props
}: TypographyProps) => {
  const Component = as || variant;

  return (
    <Component className={cn(typographyClasses[variant], className)} {...props}>
      {children}
    </Component>
  );
};
