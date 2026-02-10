/**
 * The API error type.
 */
export type ApiError<T> = {
  /**
   * The error data.
   */
  data: T;
  /**
   * The status of the error.
   */
  status: number;
};
