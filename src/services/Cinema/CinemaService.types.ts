import type { Cinema, PageResponse } from '@/types';

/**
 *  Query parameters used to filter the cinema list endpoint.
 */
export type CinemaListPaginatedQueryParams = {
  /**
   * Returns list of cinema with search filter on name or
   * city name
   */
  search?: string;
  /**
   *  Array of city IDs to filter cinemas.
   */
  cities?: number[];
};

/**
 *  Query parameters used to filter the cinema list endpoint.
 */
export type CinemaListQueryParams = {
  /**
   *  Array of cinems IDs to filter cinemas.
   */
  cinemaIds?: number[];
};

/**
 * Structure of cinema returned in CinemaListPaginated API.
 */
export type CinemaPaginatedApiResponse = Pick<Cinema, 'id' | 'address' | 'city' | 'image' | 'name'>;

/**
 * Cinema List Paginated API response.
 */
export type CinemaListPaginatedResponse = PageResponse<CinemaPaginatedApiResponse>;

/**
 * Structure of cinema returned in CinemaList API.
 */
export type CinemaListApiResponse = Array<Pick<Cinema, 'id' | 'city' | 'name'>>;
