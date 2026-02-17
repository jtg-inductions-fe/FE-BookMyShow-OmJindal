import type { Dispatch, SetStateAction } from 'react';

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
  filters: CinemaListFilter;
  setFilters: Dispatch<SetStateAction<CinemaListFilter>>;
};
