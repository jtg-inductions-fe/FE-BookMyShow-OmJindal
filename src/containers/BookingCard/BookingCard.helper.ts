import { API_CONSTANTS } from '@/constants';
import type { Booking } from '@/types';

import type { BookingState } from './BookingCard.types';

/**
 * Helper function to generate the booking state.
 */
export const getBookingState = (
  startTime: Booking['startTime'],
  status: Booking['status'],
): BookingState => {
  const showTime = new Date(startTime);
  const now = new Date();

  if (status === API_CONSTANTS.BOOKING.STATUS.CANCELLED) {
    return 'CANCELLED';
  }

  if (showTime < now) {
    return 'PAST';
  }

  return 'UPCOMING';
};
