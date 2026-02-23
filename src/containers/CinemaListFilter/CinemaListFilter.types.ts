export type CinemaListFilter = {
  /**
   *  Array of city IDs to filter cinemas.
   */
  cities: number[];
};

/**
 * Props for CinemaList Filter component
 */
export type CinemaListFilterProps = {
  /**
   * Current filter values applied to the cinema list.
   */
  filters: CinemaListFilter;
  /**
   * Callback used to update the filter.
   */
  updateFilter: <K extends keyof CinemaListFilter>(key: K, value: CinemaListFilter[K]) => void;
};
