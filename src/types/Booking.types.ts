/**
 * Represents a single movie booking made by a user.
 */
export type Booking = {
  /*
   * Unique identifier for the booking.
   */
  id: number;
  /*
   * Name of the movie.
   */
  movie: string;
  /*
   * Name of the cinema where the movie is playing.
   */
  cinemaName: string;
  /*
   * City in which the cinema is located.
   */
  cinemaCity: string;
  /**
   * Start date and time of the show.
   */
  startTime: string;
  /**
   * Current booking status.
   * - 'B' - Booked
   * - 'C' - Cancelled
   */
  status: 'B' | 'C';
  /**
   * List of seats associated with this booking.
   */
  seats: Array<{
    /*
     * Row number of the seat.
     */
    rowNumber: number;
    /*
     * Seat number within the row.
     */
    seatNumber: number;
  }>;
};
