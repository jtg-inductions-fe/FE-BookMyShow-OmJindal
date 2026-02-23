import type { Cinema, Language, Movie, PageResponse, Slot } from '@/types';

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
 *  Request parameters used to filter the cinema list by specific IDs.
 */
export type CinemaListRequest = {
  /**
   *  Array of cinema IDs to filter cinemas.
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

/**
 * Params to filter cinema detail API.
 */
export type CinemaDetailQueryParams = {
  /**
   * The date of the slot
   */
  date?: string;
  /**
   * The id of the cinema.
   */
  cinemaId?: string;
};

/**
 * The base structure of the CinemaDetail API response.
 *
 * Extends basic cinema details and add more details.
 * Movie - {@link Movie}
 */
type CinemaDetailBase<TSlot> = Pick<Cinema, 'id' | 'address' | 'city' | 'image' | 'name'> & {
  /**
   * Array of movies.
   */
  movies: Array<{
    /**
     * The structure of the movie.
     */
    movie: Pick<Movie, 'id' | 'name' | 'poster' | 'duration' | 'genres'>;
    /**
     * The array of the languages containing language and slot information.
     */
    languages: Array<{
      /**
       * The structure of the language.
       */
      language: Pick<Language, 'id' | 'name'>;
      /**
       * Array of slots.
       */
      slots: Array<TSlot>;
    }>;
  }>;
};

/**
 * Defines the CinemaDetail response for frontend.
 */
export type CinemaDetailResponse = CinemaDetailBase<Pick<Slot, 'id' | 'price' | 'startTime'>>;

/**
 * Defines the CinemaDetail response received from backend.
 */
export type CinemaDetailApiResponse = CinemaDetailBase<
  Pick<Slot, 'id' | 'price'> & {
    start_time: string;
  }
>;
