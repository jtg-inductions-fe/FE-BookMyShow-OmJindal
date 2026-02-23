import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { Button } from '@/components/Button';
import { Calendar } from '@/components/Calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/Popover';

import type { DatePickerProps } from './DatePicker.types';
import { Typography } from '../Typography';

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
        <Typography tag="span">{date ? format(date, dateDisplayFormat) : title}</Typography>
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0">
      <Calendar mode="single" selected={date} onSelect={onSelect} disabled={disabled} />
    </PopoverContent>
  </Popover>
);
