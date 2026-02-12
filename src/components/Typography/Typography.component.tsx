import { Link } from 'react-router';

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
 * <Typography variant="h3" tag="p">Subtitle text</Typography>
 * // Renders a <p> tag that visually looks like an h3
 * @param props - {@link TypographyProps}
 */
export const Typography = (props: TypographyProps) => {
  if (props.asLink) {
    const { asLink, to, variant = 'a', color = 'primary', className, ...rest } = props;
    return (
      <Link
        {...rest}
        to={to}
        data-link={asLink}
        className={cn(TypographyVariants({ color, variant }), className)}
      />
    );
  }
  const { tag = 'p', variant = tag, color = 'primary', className, children, ...rest } = props;
  const Component = tag;

  return (
    <Component className={cn(TypographyVariants({ color, variant }), className)} {...rest}>
      {children}
    </Component>
  );
};
