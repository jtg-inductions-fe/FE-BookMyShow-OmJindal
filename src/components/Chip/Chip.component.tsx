import { cn } from '@/utils';

import type { ChipProps } from './Chip.types';
import { buttonVariants } from '../Button';

/**
 * Component used to display chip
 */
export const Chip = ({ variant = 'default', size = 'default', className, ...rest }: ChipProps) => (
  <span className={cn(buttonVariants({ variant, size, className }))} {...rest} />
);
