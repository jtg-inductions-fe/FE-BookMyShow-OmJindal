import { Link } from 'react-router';

import { cn } from '@/utils';

import { buttonVariants } from './Button.styles';
import type { ButtonProps } from './Button.types';

/**
 * A polymorphic Button component that can render either a native `<button>`
 * or a React Router `<Link>` based on the `asLink` prop.
 *
 * @example
 * // Standard button usage
 * <Button onClick={() => console.log('Clicked')}>
 *   Click Me
 * </Button>
 *
 * @example
 * // Render as a React Router Link
 * <Button asLink to="/dashboard">
 *   Go to Dashboard
 * </Button>
 *
 * @param props - {@link ButtonProps}
 */
export const Button = (props: ButtonProps) => {
  if (props.asLink) {
    const { asLink, to, variant = 'default', size = 'default', className, ...rest } = props;
    return (
      <Link
        {...rest}
        to={to}
        data-link={asLink}
        className={cn(buttonVariants({ variant, size, className }))}
      />
    );
  }

  const { variant = 'default', size = 'default', className, ...rest } = props;

  return (
    <button
      {...rest}
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
    />
  );
};
