import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { Button } from '@/components/Button';
import { Calendar } from '@/components/Calender';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/Popover';

import type { DatePickerProps } from './DatePicker.types';

export const DatePicker = ({ date, selectDate }: DatePickerProps) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button variant="ghost" data-empty={!date} className="border-2 rounded-full">
        <CalendarIcon className="text-pink" />
        {date ? format(date, 'PPP') : <span>Pick a date</span>}
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0">
      <Calendar
        mode="single"
        selected={date}
        onSelect={selectDate}
        disabled={{ before: new Date() }}
      />
    </PopoverContent>
  </Popover>
);
