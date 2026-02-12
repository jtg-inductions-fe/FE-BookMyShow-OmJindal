/**
 *  Query parameters used to filter the movie list endpoint.
 */
export type MovieListQuery = {
  /**
   * Returns movies released within the last N days.
   */
  latest_days?: number;
  /**
   *  Array of genre IDs to filter movies.
   */
  genres?: number[];
  /**
   *  Array of language IDs to filter movies.
   */
  languages?: number[];
  /**
   *  Array of cinema IDs to filter movies.
   */
  cinemas?: number[];
  /**
   * To check whether a slot is available on given date.
   */
  date?: string;
};
