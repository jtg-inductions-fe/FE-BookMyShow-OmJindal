import { Typography } from '@/components/Typography';

import type { CinemaDetailCardProps } from './CinemaDetailCard.types';

export const CinemaDetailCard = ({ imgUrl, title, subtitle, icon }: CinemaDetailCardProps) => (
  <article className="h-full w-full flex flex-row items-center gap-10 p-5 rounded-2xl justify-center sm:justify-start">
    <div className="h-20 w-20 rounded-xl">
      <img
        src={imgUrl}
        alt={title}
        className="h-full w-full object-cover rounded-xl"
        loading="lazy"
      />
    </div>
    <div className="hidden xs:block">
      <Typography variant="h2" tag="h1" color="default" title={title} lineClamp={2}>
        {title}
      </Typography>
      <div className="flex gap-1">
        {icon}
        <Typography color="default" title={subtitle} lineClamp={2}>
          {subtitle}
        </Typography>
      </div>
    </div>
  </article>
);
