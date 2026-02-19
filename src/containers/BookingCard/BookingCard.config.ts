import type { BookingCardStatus } from '@/components';

import type { BookingState } from './BookingCard.types';

export const BOOKING_CARD_CONFIG: Record<
  BookingState,
  {
    bookingStatus?: BookingCardStatus;
    badgeText?: string;
    actionLabel?: string;
  }
> = {
  UPCOMING: {
    bookingStatus: 'success',
    badgeText: 'Upcoming',
    actionLabel: 'Cancel Booking',
  },
  CANCELLED: {
    bookingStatus: 'error',
    badgeText: 'Cancelled',
    actionLabel: undefined,
  },
  PAST: {
    bookingStatus: undefined,
    badgeText: undefined,
    actionLabel: undefined,
  },
} as const;
