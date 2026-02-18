import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

import { buttonVariants } from '@/components/Button';

/**
 * Props for the Chip component.
 */
export type ChipProps = VariantProps<typeof buttonVariants> & ComponentProps<'span'>;
