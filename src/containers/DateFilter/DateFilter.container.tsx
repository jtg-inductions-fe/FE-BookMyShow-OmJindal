import { format } from 'date-fns';

import { DatePicker } from '@/components';

import type { DateFilterProps } from './DateFilter.types';

export const DateFilter = ({ value, onChange }: DateFilterProps) => (
  <DatePicker
    date={value ? new Date(value) : undefined}
    selectDate={(d) => {
      onChange(d ? format(d, 'yyyy-MM-dd') : undefined);
    }}
  />
);
