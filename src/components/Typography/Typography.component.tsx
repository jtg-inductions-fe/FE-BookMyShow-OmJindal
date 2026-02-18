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
export const Typography = ({
  tag = 'p',
  variant = tag,
  color = 'primary',
  children,
  ...props
}: TypographyProps) => {
  const Component = tag;

  return (
    <Component className={TypographyVariants({ color, variant })} {...props}>
      {children}
    </Component>
  );
};
