import type { Booking } from '@/types';

/**
 * Props for BookingCardContainer
 *
 * Extends basic Booking fields.
 * Booking - {@link Booking}
 */
export type BookingCardContainerProps = Booking & {
  /**
   * Indicates whether we are fetching the bookings or not.
   */
  isFetching: boolean;
};
