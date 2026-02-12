/**
 * Defines the structure of the movie.
 */
export type Movie = {
  /*
   * Unique identifier for the movie.
   */
  id: number;
  /**
   * The name of the movie.
   */
  name: string;
  /**
   * The poster of the movie.
   */
  poster: string;
  /**
   * A brief description of the movie.
   */
  description: string;
  /**
   * The duration of the movie.
   */
  duration: string;
  /**
   * List of genres associated with the movie.
   */
  genres: string[];
  /**
   * List of languages associated with the movie.
   */
  languages: string[];
};
