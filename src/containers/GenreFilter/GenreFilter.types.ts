/**
 * The props for genre filter.
 */
export type GenreFilterProps = {
  /**
   * The currently selected genre IDs.
   */
  value: number[];
  /**
   * Callback fired whenever the selected genres change.
   */
  onChange: (genres: number[]) => void;
};
