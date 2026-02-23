import type { API_CONSTANTS } from '@/constants';
import type { Cinema, Seat, Slot } from '@/types';

/**
 * API response received from the backend.
 *
 * Extends slot fields and add extra fields.
 */
export type SlotApiResponse = Pick<Slot, 'price' | 'language'> & {
  /**
   * The start time of the slot.
   */
  start_time: string;
  /**
   * The name of the movie.
   */
  movie: string;
  /**
   * Structure of the cinema.
   */
  cinema: Pick<Cinema, 'name' | 'city' | 'rows'> & {
    seats_per_row: number;
  };
  /**
   * Array of seats.
   */
  seats: Array<{
    /**
     * The unique identifier for the seat.
     */
    id: number;
    /**
     * The row number of the seat.
     */
    row_number: number;
    /**
     * The seat number within the row.
     */
    seat_number: number;
    /**
     * Defines the availability of the seat.
     */
    is_available: boolean;
  }>;
};

export type SeatStatus = (typeof API_CONSTANTS.SEAT.STATUS)[keyof typeof API_CONSTANTS.SEAT.STATUS];

/**
 * Structure of slot API on frontend.
 *
 * Extends slot fields and add extra fields.
 */
export type SlotResponse = Pick<Slot, 'price' | 'language' | 'startTime'> & {
  /**
   * The name of the movie.
   */
  movie: string;
  /**
   * Structure of the cinema.
   */
  cinema: Pick<Cinema, 'name' | 'city' | 'rows' | 'seatsPerRow'>;
  /**
   * Array of seats.
   */
  seats: Array<
    Seat & {
      /**
       * Defines the availability of the seat.
       */
      status: SeatStatus;
    }
  >;
};
