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
  grid: ({ id: number; status: SeatStatus } | null)[][];
  /**
   * Array of currently selected seat IDs.
   */
  selectedSeats: number[];
  /**
   * Callback triggered when a seat is clicked.
   */
  onSelect: (id: number) => void;
};
