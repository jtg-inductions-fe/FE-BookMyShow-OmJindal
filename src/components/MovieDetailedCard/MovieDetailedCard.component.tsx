import { memo } from 'react';

import { Chip } from '@/components/Chip';
import { Typography } from '@/components/Typography';

import type { MovieDetailedCardProps } from './MovieDetailedCard.types';

export const MovieDetailedCard = memo(function MovieDetailedCard({
  title,
  poster,
  description,
  tags,
  info,
}: MovieDetailedCardProps) {
  return (
    <article className="h-full flex items-center gap-10">
      {poster && (
        <div className="h-70 md:h-80 w-80 rounded-2xl">
          <img
            src={poster}
            alt={`${title} poster`}
            className="h-full w-full rounded-2xl object-cover"
            loading="lazy"
          />
        </div>
      )}
      <div className="hidden md:block space-y-5">
        <Typography variant="h2" tag="h1" color="default">
          {title}
        </Typography>
        {tags.length > 0 && (
          <div className="flex flex-row gap-2">
            {tags.map((tag, index) => (
              <Chip
                size="chip"
                variant="secondary"
                key={'tag-' + index}
                className="hover:text-white"
              >
                {tag}
              </Chip>
            ))}
          </div>
        )}
        {info && info.length > 0 && (
          <div className="flex flex-row gap-5">
            {info.map((item, index) => (
              <div className="flex flex-row gap-2" key={`${item.label}-${index}`}>
                {item.icon}
                <Typography color="default">{item.label}</Typography>
              </div>
            ))}
          </div>
        )}
        {description && <Typography color="default">{description}</Typography>}
      </div>
    </article>
  );
});
