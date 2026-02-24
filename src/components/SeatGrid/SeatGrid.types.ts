/**
 * Represents the possible seat availability states.
 */
export type SeatStatus = 'A' | 'B';

/**
 * Props for the SeatGrid component.
 */
export type SeatGridProps = {
  /**
   * A 2D matrix representing the cinema seating layout.
   */
  grid: Array<{
    /**
     * The label of the row.
     */
    label: string;
    /**
     * The data in each row.
     */
    data: Array<{
      /**
       * Unique identifier of the seat.
       */
      id: number;
      /**
       * The status of the seat.
       */
      status: SeatStatus;
    } | null>;
  }>;
  /**
   * Array of currently selected seat IDs.
   */
  selectedSeats: number[];
  /**
   * Callback triggered when a seat is clicked.
   */
  onSelect: (id: number) => void;
  /**
   * To disable the seat grid
   */
  disabled?: boolean;
};
