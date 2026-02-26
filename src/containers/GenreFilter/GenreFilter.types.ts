/**
 * The props for genre filter.
 */
export type GenreFilterProps = {
  /**
   * The currently selected genre IDs.
   */
  value: string[];
  /**
   * Callback fired whenever the selected genres change.
   */
  onChange: (genres: string[]) => void;
};
