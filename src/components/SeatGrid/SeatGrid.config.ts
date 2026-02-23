import type { SeatStatus } from './SeatGrid.types';

/**
 * Visual style configuration for SeatGrid seats.
 */
export const SEAT_STYLE_CONFIG = {
  base: 'h-7 w-7 rounded-sm flex items-center justify-center border-2',

  states: {
    sold: {
      className: 'bg-secondary/20 border-secondary/20 cursor-not-allowed',
      textColor: 'default',
      isDisabled: true,
    },
    selected: {
      className: 'bg-purple border-purple text-white',
      textColor: 'default',
      isDisabled: false,
    },
    available: {
      className: 'bg-white border-purple',
      textColor: 'primary',
      isDisabled: false,
    },
  },

  /**
   * Helper to resolve seat state.
   */
  resolveState: (status: SeatStatus, isSelected: boolean) => {
    if (status === 'B') return 'sold';
    if (isSelected) return 'selected';
    return 'available';
  },
} as const;
