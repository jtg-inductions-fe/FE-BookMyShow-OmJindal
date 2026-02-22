import { API_URLS } from '@/constants';
import { api } from '@/services/Api';

import type {
  CinemaListApiResponse,
  CinemaListPaginatedQueryParams,
  CinemaListPaginatedResponse,
  CinemaListRequest,
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

        const queryString = params.toString();
        return {
          url: queryString
            ? `${API_URLS.CINEMA.LIST_PAGINATED}?${queryString}`
            : API_URLS.CINEMA.LIST_PAGINATED,
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
    cinemaList: builder.query<CinemaListApiResponse, CinemaListRequest>({
      query: (queryArg) => {
        const params = new URLSearchParams();
        if (queryArg.cinemaIds?.length)
          params.append('cinema_ids', String(queryArg.cinemaIds.join(',')));

        const queryString = params.toString();
        return {
          url: queryString ? `${API_URLS.CINEMA.LIST}?${queryString}` : API_URLS.CINEMA.LIST,
          method: 'GET',
        };
      },
    }),
  }),
});

export const { useCinemaListPaginatedInfiniteQuery, useCinemaListQuery } = cinemaApi;
