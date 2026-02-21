import { Typography } from '@/components/Typography';

import type { CinemaCardProps } from './CinemaCard.types';

export const CinemaCard = ({ imgUrl, title, subtitle, icon }: CinemaCardProps) => (
  <article className="h-full w-full p-5 border-2 border-border-grey rounded-2xl bg-white space-y-3 hover:-translate-y-2 hover:border-black/75 transition-all duration-200 ease-in-out">
    <div className="h-20 w-20 rounded-xl">
      <img
        src={imgUrl}
        alt={`${title} poster`}
        className="h-full w-full object-cover rounded-xl"
        loading="lazy"
      />
    </div>
    <Typography variant="h3" tag="h2">
      {title}
    </Typography>
    <div className="flex gap-1">
      {icon}
      <Typography color="secondary">{subtitle}</Typography>
    </div>
  </article>
);
