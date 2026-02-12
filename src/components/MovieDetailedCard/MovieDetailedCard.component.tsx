import { memo } from 'react';

import { Clock as ClockIcon, EarthIcon } from 'lucide-react';

import type { Movie } from '@/types';

import { Chip } from '../Chip';
import { Typography } from '../Typography';

export const MovieDetailedCard = memo(function MovieDetailedCard({
  poster,
  name,
  genres,
  languages,
  duration,
  description,
}: Movie) {
  const languageLabel = languages?.join(', ');
  const durationLabel = `${duration?.slice(0, 2)}h ${duration?.slice(3, 5)}m`;

  return (
    <article className="w-full h-full flex items-center justify-center flex-row gap-10">
      {poster ? (
        <div className="h-70 md:h-80 w-80 rounded-2xl">
          <img
            src={poster}
            alt={`${name} poster`}
            className="h-full w-full rounded-2xl object-cover"
          />
        </div>
      ) : (
        <div className="bg-white/80 h-70 md:h-80 w-80 rounded-2xl"></div>
      )}
      <div className="flex-col gap-5 hidden md:flex">
        {name && (
          <Typography variant="h2" tag="h1" color="default">
            {name}
          </Typography>
        )}
        {genres && (
          <div className="flex flex-row gap-2">
            {genres?.map((genre, index) => (
              <Chip size="chip" variant="secondary" key={'genre-' + index}>
                {genre}
              </Chip>
            ))}
          </div>
        )}
        <div className="flex flex-row gap-5">
          {duration && (
            <div className="flex flex-row gap-2">
              <ClockIcon color="white" />
              {<Typography color="default">{durationLabel}</Typography>}
            </div>
          )}
          {languageLabel && (
            <div className="flex flex-row gap-2">
              <EarthIcon color="white" />
              <Typography color="default">{languageLabel}</Typography>
            </div>
          )}
        </div>
        {description && (
          <div>
            <Typography color="default" variant="h3" tag="h2">
              Description
            </Typography>
            <Typography color="default">{description}</Typography>
          </div>
        )}
      </div>
    </article>
  );
});
