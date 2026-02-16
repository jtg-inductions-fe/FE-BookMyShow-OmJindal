import { API_URLS } from '@/constants';
import { api } from '@/services/Api';

import type {
  MovieDetailApiResponse,
  MovieDetailResponse,
  MovieDetailsQuery,
  MovieListQuery,
  MoviePaginatedResponse,
} from './MovieService.types';

/**
 * Movie related API endpoints.
 */
const movieApi = api.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Retrieves the list of movies from the backend based on
     * different filters.
     */
    movieList: builder.infiniteQuery<MoviePaginatedResponse, MovieListQuery, string | null>({
      query: ({ queryArg, pageParam }) => {
        if (pageParam) {
          return {
            url: pageParam,
            method: 'GET',
          };
        }

        const params = new URLSearchParams();
        if (queryArg.latest_days) params.append('latest_days', String(queryArg.latest_days));
        if (queryArg.genres?.length) params.append('genres', queryArg.genres.join(','));
        if (queryArg.languages?.length) params.append('languages', queryArg.languages.join(','));
        if (queryArg.cinemas?.length) params.append('cinemas', queryArg.cinemas.join(','));
        if (queryArg.date) params.append('date', queryArg.date);

        return {
          url: `${API_URLS.MOVIE.LIST}?${params.toString()}`,
          method: 'GET',
        };
      },
      infiniteQueryOptions: {
        initialPageParam: null,
        getNextPageParam: (lastPage) => lastPage.next,
      },
    }),
    /**
     * Retrieves the details of movie along with cinema and slot information
     * from the backend based on different filters.
     */
    movieDetail: builder.query<MovieDetailResponse, MovieDetailsQuery>({
      query: (queryArg) => {
        const params = new URLSearchParams();
        if (queryArg.city) params.append('city', String(queryArg.city));
        if (queryArg.date) params.append('date', queryArg.date);

        return {
          url: `${API_URLS.MOVIE.LIST}${queryArg.movieId}/?${params.toString()}`,
          method: 'GET',
        };
      },
      transformResponse: (response: MovieDetailApiResponse): MovieDetailResponse => ({
        ...response,
        cinemas: response.cinemas.map((cinemaItem) => ({
          cinema: cinemaItem.cinema,
          languages: cinemaItem.languages.map((langItem) => ({
            language: langItem.language,
            slots: langItem.slots.map((slot) => ({
              id: slot.id,
              price: slot.price,
              startTime: slot.start_time,
            })),
          })),
        })),
      }),
    }),
  }),
});

export const { useMovieListInfiniteQuery, useMovieDetailQuery } = movieApi;
