import type { Booking } from '@/types';

/**
 * API response for the user booking history endpoint.
 *
 * Extends basic booking id, movie and status and add backend
 * specific fields name.
 *
 * Booking - {@link Booking}
 */
export type BookingApiResponse = Pick<Booking, 'id' | 'movie' | 'status'> & {
  /*
   * Name of the cinema where the movie is playing.
   */
  cinema_name: string;
  /*
   * City in which the cinema is located.
   */
  cinema_city: string;
  /**
   * Start date and time of the show.
   */
  start_time: string;
  /**
   * List of seats associated with this booking.
   */
  seats: Array<{
    /*
     * Row number of the seat.
     */
    row_number: number;
    /*
     * Seat number within the row.
     */
    seat_number: number;
  }>;
};
