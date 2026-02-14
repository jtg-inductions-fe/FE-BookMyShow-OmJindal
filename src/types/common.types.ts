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

/*
 * Defines the structure of the language.
 */
export type Language = {
  /*
   * Unique identifier for the language.
   */
  id: number;
  /**
   * The name of the language.
   */
  name: string;
};

/**
 * Defines the structure of the genre.
 */
export type Genre = {
  /*
   * Unique identifier for the genre.
   */
  id: number;
  /**
   * The name of the genre.
   */
  name: string;
};

/**
 * Defines the structure of the city.
 */
export type City = {
  /*
   * Unique identifier for the city.
   */
  id: number;
  /**
   * The name of the city.
   */
  name: string;
};
