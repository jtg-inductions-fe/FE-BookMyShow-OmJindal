import type { ChipProps } from '@/components/Chip';

import type { BookingCardStatus } from './BookingCard.types';

/**
 * Styles for bookingCard component based on status prop.
 */
export const STYLES_CONFIG: Record<
  BookingCardStatus | 'default',
  {
    statusBarClass: string;
    badgeVariant: ChipProps['variant'];
  }
> = {
  error: {
    statusBarClass: 'bg-error',
    badgeVariant: 'destructive-soft',
  },
  success: {
    statusBarClass: 'bg-success',
    badgeVariant: 'success',
  },
  default: {
    statusBarClass: 'bg-secondary/50',
    badgeVariant: 'secondary',
  },
} as const;
