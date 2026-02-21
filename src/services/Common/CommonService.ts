import { API_URLS } from '@/constants';
import { api } from '@/services/Api';

import type {
  CityListPaginatedResponse,
  CityListQuery,
  CityListQueryParams,
  CityListResponse,
  GenreListResponse,
  LanguageListResponse,
} from './Common.types';

/**
 * Common API endpoints
 */
const commonApi = api.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Retrieves the list of genres from the backend.
     */
    genreList: builder.query<GenreListResponse, void>({
      query: () => ({
        url: API_URLS.COMMON.GENRES,
        method: 'GET',
      }),
    }),
    /**
     * Retrieves the list of languages from the backend.
     */
    languageList: builder.query<LanguageListResponse, void>({
      query: () => ({
        url: API_URLS.COMMON.LANGUAGES,
        method: 'GET',
      }),
    }),
    /**
     * Retrieves the list of cities from the backend.
     */
    cityList: builder.query<CityListResponse, CityListQueryParams>({
      query: (queryArg) => {
        const params = new URLSearchParams();
        if (queryArg.cityIds?.length) params.append('city_ids', String(queryArg.cityIds.join(',')));
        return {
          url: `${API_URLS.COMMON.CITIES}?${params.toString()}`,
          method: 'GET',
        };
      },
    }),
    /**
     * Retrieves the paginated list of cities from the backend based on
     * search filters.
     */
    cityListPaginated: builder.infiniteQuery<
      CityListPaginatedResponse,
      CityListQuery,
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
        if (queryArg?.search) params.append('search', queryArg.search);
        return {
          url: `${API_URLS.COMMON.CITY_PAGINATED}?${params.toString()}`,
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

export const {
  useGenreListQuery,
  useLanguageListQuery,
  useCityListPaginatedInfiniteQuery,
  useCityListQuery,
} = commonApi;
