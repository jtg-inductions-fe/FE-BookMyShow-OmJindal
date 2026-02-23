import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps, ReactNode } from 'react';

import type { buttonVariants } from '@/components/Button';

export type ChipGroupProps<T> = VariantProps<typeof buttonVariants> &
  ComponentProps<'button'> & {
    /**
     * Array of selected item IDs that should be rendered as chips.
     */
    ids: number[];
    /**
     * The entire chip-group dataset.
     */
    data: T[];
    /**
     * Function used to extract the ID for the chip.
     */
    getId: (item: T) => number;
    /**
     * Function used to extract the display label for a chip.
     */
    getLabel: (item: T) => string;
    /**
     * Callback triggered when a chip is clicked.
     */
    onAction: (id: number) => void;
    /**
     * Optional icon element displayed alongside the chip label.
     */
    icon?: ReactNode;
    /**
     * Title used to identify the chip group
     */
    title: string;
  };
