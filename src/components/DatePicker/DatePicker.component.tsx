import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { Button } from '@/components/Button';
import { Calendar } from '@/components/Calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/Popover';
import { Typography } from '@/components/Typography';

import type { DatePickerProps } from './DatePicker.types';

export const DatePicker = ({
  date,
  onSelect,
  disabled,
  title,
  dateDisplayFormat = 'PPP',
}: DatePickerProps) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button variant="ghost" data-empty={!date} className="border-2 rounded-full space-x-2">
        <CalendarIcon className="text-pink" />
        {date ? (
          <Typography tag="span">{format(date, dateDisplayFormat)}</Typography>
        ) : (
          <Typography tag="span" color="secondary" variant="small">
            {title}
          </Typography>
        )}
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0">
      <Calendar mode="single" selected={date} onSelect={onSelect} disabled={disabled} />
    </PopoverContent>
  </Popover>
);
