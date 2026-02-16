import { Link } from 'react-router';

import { Typography } from '@/components/Typography';
import { amountFormatter, timeFormatter } from '@/utils';

import type { SlotCardProps } from './SlotCard.types';

export const SlotCard = ({ imgUrl, title, subtitle, icon, group }: SlotCardProps) => (
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

      <Typography tag="h3" variant="h6">
        {group.label}
      </Typography>

      {group.sections.map((section) => (
        <ul key={`group-${section.data.id}`}>
          <li className="space-y-2">
            <Typography color="secondary">{section.data.title}</Typography>
            <ul className="flex flex-row gap-3">
              {section.items.map((item) => (
                <li key={`item-${item.id}`}>
                  <Link
                    to={`/slot/seat-layout/${item.id}`}
                    className="min-w-25 flex flex-col gap-1 items-center p-2 border-2 border-grey-border rounded-lg hover:bg-purple/20 hover:border-purple"
                  >
                    <Typography tag="span" variant="h6">
                      {timeFormatter(item.startTime)}
                    </Typography>
                    <Typography tag="span" color="secondary">
                      {amountFormatter(item.price)}
                    </Typography>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      ))}
    </div>
  </article>
);
