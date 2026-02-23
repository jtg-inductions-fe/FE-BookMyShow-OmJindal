/**
 * Generic paginated API response.
 */
export type PageResponse<T> = {
  /**
   * Array of items for the current page.
   */
  results: T[];
  /**
   * URL of the next page,
   */
  next: string | null;
  /**
   * URL of the previous page,
   */
  previous: string | null;
};

/**
 * Base shape for simple lookup entities (id + name pairs).
 */
type NamedEntity = {
  id: number;
  name: string;
};

/*
 * Defines the structure of the language.
 */
export type Language = NamedEntity;
/**
 * Defines the structure of the genre.
 */
export type Genre = NamedEntity;
/**
 * Defines the structure of the city.
 */
export type City = NamedEntity;
