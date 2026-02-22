import { format, parse } from 'date-fns';

import { DatePicker } from '@/components';
import { API_CONSTANTS } from '@/constants';

import type { DateFilterProps } from './DateFilter.types';

export const DateFilter = ({ value, onChange, disabled }: DateFilterProps) => (
  <DatePicker
    date={value ? parse(value, API_CONSTANTS.DATE_FORMAT, new Date()) : undefined}
    onSelect={(date) => {
      onChange(date ? format(date, API_CONSTANTS.DATE_FORMAT) : undefined);
    }}
    disabled={disabled}
    title="Pick a date"
    dateDisplayFormat="PPP"
  />
);
