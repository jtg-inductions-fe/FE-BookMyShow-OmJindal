import type { Cinema, Language, Movie, PageResponse, Slot } from '@/types';

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

/**
 * Paginated response for movie-list API.
 */
export type MoviePaginatedResponse = PageResponse<
  Pick<Movie, 'id' | 'description' | 'duration' | 'genres' | 'languages' | 'name' | 'poster'>
>;
/**
 * The base structure of the MovieDetail API response.
 *
 * Extends basic movie details and add more details.
 * Movie - {@link Movie}
 */
type MovieDetailBase<TSlot> = Pick<
  Movie,
  'id' | 'description' | 'duration' | 'genres' | 'languages' | 'name' | 'poster'
> & {
  /**
   * Array of cinemas.
   */
  cinemas: Array<{
    /**
     * The structure of the cinema.
     */
    cinema: Pick<Cinema, 'id' | 'name' | 'address' | 'city' | 'image'>;
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
 * Defines the MovieDetail response for frontend.
 */
export type MovieDetailResponse = MovieDetailBase<Pick<Slot, 'id' | 'price' | 'startTime'>>;

/**
 * Defines the MovieDetail response received from backend.
 */
export type MovieDetailApiResponse = MovieDetailBase<
  Pick<Slot, 'id' | 'price'> & {
    start_time: string;
  }
>;

/**
 * The query params used to fetch and filter movieDetail endpoint.
 */
export type MovieDetailsQuery = {
  /**
   * The unique identifier of the movie.
   */
  movieId?: string;
  /**
   * The city id to filter the cinemas.
   */
  city?: number;
  /**
   * The date string to filter the slots.
   */
  date?: string;
};
