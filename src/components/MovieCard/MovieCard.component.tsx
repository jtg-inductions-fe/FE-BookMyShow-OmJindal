import { memo } from 'react';

import { Typography } from '@/components/Typography';

import type { MovieCardProps } from './MovieCard.types';

export const MovieCard = memo(function MovieCard({
  title,
  poster,
  primaryLabel,
  secondaryLabel,
}: MovieCardProps) {
  return (
    <article className="h-full w-full border-2 border-border-grey rounded-xl hover:-translate-y-2 hover:border-black/75 transition-all duration-200 ease-in-out">
      {poster && (
        <div className="w-full h-50 rounded-t-xl">
          <img
            src={poster}
            alt={`${title} poster`}
            className="h-full w-full rounded-t-xl object-cover"
            loading="lazy"
          />
        </div>
      )}
      <div className="p-3">
        <Typography variant="h3" tag="h2" title={title} lineClamp={1}>
          {title}
        </Typography>
        <Typography color="secondary" title={primaryLabel} lineClamp={2}>
          {primaryLabel}
        </Typography>
        <Typography color="secondary" title={secondaryLabel} lineClamp={2}>
          {secondaryLabel}
        </Typography>
      </div>
    </article>
  );
});
