/**
 * Structure for movie detail filters.
 */
export type MovieDetailFilter = {
  /**
   * The city id to filter the cinemas.
   */
  city?: string;
  /**
   * The date string to filter the slots.
   */
  date?: string;
};
