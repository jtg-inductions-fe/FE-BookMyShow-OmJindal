/**
 * The props for cinema filter.
 */
export type CinemaFilterProps = {
  /**
   * The currently selected cinema IDs.
   */
  value: number[];
  /**
   * Callback fired whenever the selected cinemas change.
   */
  onChange: (cinemaIds: number[]) => void;
};
