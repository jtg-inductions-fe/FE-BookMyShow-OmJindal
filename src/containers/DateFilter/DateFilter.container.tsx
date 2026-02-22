import { format, parse } from 'date-fns';

import { DatePicker } from '@/components';

import type { DateFilterProps } from './DateFilter.types';

export const DateFilter = ({ value, onChange }: DateFilterProps) => (
  <DatePicker
    date={value ? parse(value, 'yyyy-MM-dd', new Date()) : undefined}
    onSelect={(date) => {
      onChange(date ? format(date, 'yyyy-MM-dd') : undefined);
    }}
  />
);
