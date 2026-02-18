import { buttonVariants } from '@/components/Button';
import { cn } from '@/utils';

import type { ChipProps } from './Chip.types';

/**
 * Component used to display chip
 */
export const Chip = ({ variant = 'default', size = 'chip', className, ...rest }: ChipProps) => (
  <span className={cn(buttonVariants({ variant, size }), className)} {...rest} />
);
