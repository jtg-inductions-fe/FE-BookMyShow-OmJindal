import type { Movie } from '@/types';

/**
 * Helper function to generate URL for the movie detail page navigation.
 */
export const generateMovieNavigationUrl = (movie: Movie) => {
  const slug = movie.name.toLocaleLowerCase().split(' ').join('-');
  const to = `/movies/${slug}/${movie.id}`;
  return to;
};
