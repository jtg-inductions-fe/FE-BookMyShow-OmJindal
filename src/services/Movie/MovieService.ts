import { API_URLS } from '@/constants';
import type { Movie, PageResponse } from '@/types';

import type { MovieListQuery } from './MovieService.types';
import { api } from '../Api';

/**
 * Movie related API endpoints.
 */
const movieApi = api.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Retrieves the list of movies from the backend based on
     * different filters.
     */
    movieList: builder.infiniteQuery<PageResponse<Movie>, MovieListQuery, string | null>({
      query: ({ queryArg, pageParam }) => {
        if (pageParam) {
          return {
            url: pageParam,
            method: 'GET',
          };
        }

        const params = new URLSearchParams();
        if (queryArg?.latest_days) params.append('latest_days', String(queryArg.latest_days));
        if (queryArg?.genres?.length) params.append('genres', queryArg.genres.join(','));
        if (queryArg?.languages?.length) params.append('languages', queryArg.languages.join(','));
        if (queryArg?.cinemas?.length) params.append('cinemas', queryArg.cinemas.join(','));
        if (queryArg?.date) params.append('date', queryArg.date);

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
  }),
});

export const { useMovieListInfiniteQuery } = movieApi;
