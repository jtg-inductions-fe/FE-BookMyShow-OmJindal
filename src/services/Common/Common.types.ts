import type { City, Genre, Language, PageResponse } from '@/types';

/**
 * City List Query params
 */
export type CityListQuery = {
  /**
   * Optional search keyword used to filter
   * cities by name.
   */
  search?: string;
};

/**
 * Paginated response of city List API.
 *
 * Extends city fields
 *
 * City - {@link City}
 */
export type CityListResponse = PageResponse<Pick<City, 'id' | 'name'>>;

/**
 * Paginated response of genre List API.
 *
 * Extends genre fields
 *
 * Genre - {@link Genre}
 */
export type GenreListResponse = Pick<Genre, 'id' | 'name'>[];

/**
 * Paginated response of language List API.
 *
 * Extends language fields
 *
 * Language - {@link Language}
 */
export type LanguageListResponse = Pick<Language, 'id' | 'name'>[];
