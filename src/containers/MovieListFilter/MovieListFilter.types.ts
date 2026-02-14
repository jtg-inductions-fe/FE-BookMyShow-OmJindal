import type { Dispatch, SetStateAction } from 'react';

/**
 * Props for MovieList filter state
 */
export type MovieListFilter = {
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
  filters: MovieListFilter;
  setFilters: Dispatch<SetStateAction<MovieListFilter>>;
};
