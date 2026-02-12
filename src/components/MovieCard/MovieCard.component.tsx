import { memo } from 'react';

import type { Movie } from '@/types';

import { Typography } from '../Typography';

export const MovieCard = memo(function MovieCard({ poster, name, genres, languages }: Movie) {
  const genreLabel = genres.join(', ');
  const languageLabel = languages.join(', ');

  return (
    <article className="h-full w-full border-2 border-border-grey rounded-xl hover:shadow-md hover:-translate-y-1 transition-all duration-200 ease-in-out">
      <div className="w-full h-50 rounded-t-xl">
        <img
          src={poster}
          alt={`${name} poster`}
          className="h-full w-full rounded-t-xl object-cover"
        />
      </div>
      <div className="p-3">
        <Typography variant="h3" tag="h2">
          {name}
        </Typography>
        <Typography color="secondary">{genreLabel}</Typography>
        <Typography color="secondary">{languageLabel}</Typography>
      </div>
    </article>
  );
});
