import { Typography } from '@/components/Typography';

import type { SlotCardProps } from './SlotCard.types';

export const SlotCard = ({ imgUrl, title, subtitle, icon, children }: SlotCardProps) => (
  <article className="flex flex-col md:flex-row gap-5 md:gap-10 p-5 bg-white rounded-2xl shadow-md border-grey-border border-2">
    <div className="w-25 h-25 md:w-40 md:h-40 rounded-xl">
      <img src={imgUrl} alt={`${title} poster`} className="h-full w-full rounded-xl object-cover" />
    </div>

    <div className="space-y-2">
      <Typography tag="h2">{title}</Typography>

      <div className="flex flex-row gap-1">
        {icon}
        <Typography variant="h4" color="secondary" tag="p">
          {subtitle}
        </Typography>
      </div>

      {children}
    </div>
  </article>
);
