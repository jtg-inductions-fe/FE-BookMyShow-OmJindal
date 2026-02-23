/**
 * State shape for MovieListFilter
 */
export type MovieListFilterType = {
  /**
   * The date on which the movie slot exists.
   */
  date?: string;
  /**
   * The genres of the movie.
   */
  genres: number[];
  /**
   * The languages of the movie.
   */
  languages: number[];
  /**
   * The cinemas in which the movie is being screened.
   */
  cinemas: number[];
};

/**
 * Props for MovieList Filter component
 */
export type MovieListFilterProps = {
  /**
   * Current filter values applied to the movie list.
   */
  filters: MovieListFilterType;
  /**
   * Callback used to update the filter.
   */
  updateFilter: <K extends keyof MovieListFilterType>(
    key: K,
    value: MovieListFilterType[K],
  ) => void;
  /**
   * Callback used to clear all the filter.
   */
  clearFilter: () => void;
};
