import { format } from 'date-fns';

import { DatePicker } from '@/components';

import type { DateFilterProps } from './DateFilter.types';

export const DateFilter = ({ value, onChange }: DateFilterProps) => (
  <DatePicker
    date={value ? new Date(value) : undefined}
    selectDate={(date) => {
      onChange(date ? format(date, 'yyyy-MM-dd') : undefined);
    }}
  />
);
