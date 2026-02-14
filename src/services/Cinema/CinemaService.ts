import { API_URLS } from '@/constants';
import { api } from '@/services/Api';

import type {
  CinemaListApiResponse,
  CinemaListPaginatedQueryParams,
  CinemaListPaginatedResponse,
  CinemaListQueryParams,
} from './CinemaService.types';

/**
 * Cinema related API endpoint.
 */
const cinemaApi = api.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Retrieve the paginated list of cinemas from the backend based on
     * different filters.
     */
    cinemaListPaginated: builder.infiniteQuery<
      CinemaListPaginatedResponse,
      CinemaListPaginatedQueryParams,
      string | null
    >({
      query: ({ queryArg, pageParam }) => {
        if (pageParam) {
          return {
            url: pageParam,
            method: 'GET',
          };
        }

        const params = new URLSearchParams();
        if (queryArg.search) params.append('search', queryArg.search);
        if (queryArg.cities?.length) params.append('cities', queryArg.cities.join(','));

        return {
          url: `${API_URLS.CINEMA.LIST_PAGINATED}?${params.toString()}`,
          method: 'GET',
        };
      },
      infiniteQueryOptions: {
        initialPageParam: null,
        getNextPageParam: (lastPage) => lastPage.next,
      },
    }),
    /**
     * Retrieve the list of cinemas from the backend based on
     * cinemaIds filters.
     */
    cinemaList: builder.query<CinemaListApiResponse, CinemaListQueryParams>({
      query: (queryArg) => {
        const params = new URLSearchParams();
        if (queryArg.cinemaIds?.length)
          params.append('cinemaIds', String(queryArg.cinemaIds.join(',')));
        return {
          url: `${API_URLS.CINEMA.LIST}?${params.toString()}`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const { useCinemaListPaginatedInfiniteQuery, useCinemaListQuery } = cinemaApi;
