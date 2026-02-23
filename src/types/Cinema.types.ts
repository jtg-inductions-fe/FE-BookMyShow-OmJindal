export type Cinema = {
  /**
   * The unique identifier for the cinema.
   */
  id: number;
  /**
   * The name of the cinema.
   */
  name: string;
  /**
   * The name of the city in which the cinema is located.
   */
  city: string;
  /**
   * The address of the cinema location.
   */
  address: string;
  /**
   * The number of seat rows available in cinema.
   */
  rows: number;
  /**
   * The number of seats in each row in cinema.
   */
  seatsPerRow: number;
  /**
   * The image URL of the cinema.
   */
  image: string;
};

export type Seat = {
  /**
   * The unique identifier for the seat.
   */
  id: number;
  /**
   * The row number of the seat.
   */
  rowNumber: number;
  /**
   * The seat number of the row in which
   * the seat is located.
   */
  seatNumber: number;
};
