import { Typography } from '@/components/Typography';

import type { CinemaCardProps } from './CinemaCard.types';

export const CinemaCard = ({ imgUrl, title, subtitle, icon }: CinemaCardProps) => (
  <article className="h-full w-full lg:w-80 p-5 rounded-2xl bg-white space-y-3 hover:shadow-md hover:-translate-y-1 transition-all duration-200 ease-in-out border-2 border-grey-border">
    <div className="h-20 w-20 rounded-xl">
      <img src={imgUrl} alt={`${title} poster`} className="h-full w-full object-cover rounded-xl" />
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
