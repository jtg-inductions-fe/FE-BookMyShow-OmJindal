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
