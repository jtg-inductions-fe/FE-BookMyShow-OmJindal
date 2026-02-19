import type { Booking, PageResponse } from '@/types';

/**
 * API response for the user booking history endpoint.
 *
 * Extends basic booking fields and add backend
 * specific fields name.
 * Booking - {@link Booking}
 */
export type BookingApiResponse = Pick<Booking, 'id' | 'movie' | 'status'> & {
  /**
   * Name of the cinema where the movie is playing.
   */
  cinema_name: string;
  /**
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
    /**
     * Row number of the seat.
     */
    row_number: number;
    /**
     * Seat number within the row.
     */
    seat_number: number;
  }>;
};

/**
 * Paginated response of booking api.
 */
export type BookingApiPaginatedResponse = PageResponse<BookingApiResponse>;

/**
 * BookingHistory endpoint response.
 *
 * Extends Booking fields.
 * Booking - {@link Booking}
 */
export type BookingResponse = Pick<
  Booking,
  'id' | 'movie' | 'status' | 'cinemaCity' | 'cinemaName' | 'seats' | 'startTime'
>;

/**
 * Paginated response of booking history endpoint.
 */
export type BookingPaginatedResponse = PageResponse<BookingResponse>;
