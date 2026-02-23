import { Link } from 'react-router';

import { Typography } from '@/components';
import { ROUTES } from '@/constants';
import { amountFormatter, timeFormatter } from '@/utils';

import type { SlotProps } from './Slot.types';

export const SlotContainer = ({ languages }: SlotProps) => (
  <ul className="space-y-2">
    {languages.map((language) => (
      <li key={`language-${language.language.id}`} className="space-y-2">
        <Typography color="secondary">{language.language.name}</Typography>
        <ul className="flex flex-row gap-3">
          {language.slots.map((slot) => (
            <li key={`slot-${slot.id}`}>
              <Link
                to={`${ROUTES.SLOT.BASE}${slot.id}`}
                className="min-w-25 flex flex-col gap-1 items-center p-2 border-2 border-grey-border rounded-lg hover:bg-purple/20 hover:border-purple"
              >
                <Typography tag="span" variant="h6">
                  {timeFormatter(slot.startTime)}
                </Typography>
                <Typography tag="span" color="secondary">
                  {amountFormatter(slot.price)}
                </Typography>
              </Link>
            </li>
          ))}
        </ul>
      </li>
    ))}
  </ul>
);
