import { API_URLS } from '@/constants';
import { api } from '@/services/Api';

import type {
  CinemaDetailApiResponse,
  CinemaDetailQueryParams,
  CinemaDetailResponse,
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
        if (queryArg.cinemaIds?.length) params.append('cinema_ids', queryArg.cinemaIds.join(','));

        const queryString = params.toString();
        return {
          url: queryString ? `${API_URLS.CINEMA.LIST}?${queryString}` : API_URLS.CINEMA.LIST,
          method: 'GET',
        };
      },
    }),
    /**
     * Retrieves the details of cinema along with movie and slot information
     * from the backend based on different filters.
     */
    cinemaDetail: builder.query<CinemaDetailResponse, CinemaDetailQueryParams>({
      query: (queryArg) => {
        const params = new URLSearchParams();
        if (queryArg?.date) params.append('date', queryArg.date);

        const queryString = params.toString();
        const BASE_CINEMA_DETAIL_URL = `${API_URLS.CINEMA.LIST_PAGINATED}${queryArg.cinemaId}/`;

        return {
          url: queryString ? `${BASE_CINEMA_DETAIL_URL}?${queryString}` : BASE_CINEMA_DETAIL_URL,
          method: 'GET',
        };
      },
      transformResponse: (response: CinemaDetailApiResponse): CinemaDetailResponse => ({
        ...response,
        movies: response.movies.map((movieItem) => ({
          movie: movieItem.movie,
          languages: movieItem.languages.map((langItem) => ({
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

export const { useCinemaListPaginatedInfiniteQuery, useCinemaListQuery, useCinemaDetailQuery } =
  cinemaApi;
