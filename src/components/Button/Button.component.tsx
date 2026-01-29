import { cn } from '@/utils';
import { Slot } from '@radix-ui/react-slot';

import { buttonVariants } from './Button.styles';
import type { ButtonProps } from './Button.types';

/**
 * A highly customizable Button component that supports various visual states,
 * sizes, and polymorphic rendering via the `asChild` prop.
 * @example
 * // Standard usage
 * <Button onClick={() => console.log('Clicked')}>
 * Click Me
 * </Button>
 * @example
 * // Using asChild to render a Link from a routing library
 * <Button asChild variant="secondary">
 * <Link to="/dashboard">Go to Dashboard</Link>
 * </Button>
 * @param props - {@link ButtonProps}
 */
const Button = ({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}: ButtonProps) => {
  /**
   * If asChild is true, we use the Radix Slot component to clone the child.
   * and pass the button classes/props to it. Otherwise, we render a standard 'button'.
   */
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
};

export { Button };
