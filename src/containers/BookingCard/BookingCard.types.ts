import type { Booking } from '@/types';

/**
 * Props for BookingCardContainer
 *
 * Extends Booking fields.
 * Booking - {@link Booking}
 */
export type BookingCardContainerProps = Pick<
  Booking,
  'id' | 'movie' | 'cinemaName' | 'cinemaCity' | 'status' | 'startTime' | 'seats'
>;
