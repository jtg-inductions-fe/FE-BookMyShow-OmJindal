import { format } from 'date-fns';

import { DatePicker, Typography } from '@/components';

import type { DateFilterProps } from './DateFilter.types';

export const DateFilter = ({ value, onChange }: DateFilterProps) => (
  <>
    <Typography tag="h3" variant="h4">
      Date
    </Typography>

    <DatePicker
      date={value ? new Date(value) : undefined}
      selectDate={(d) => {
        onChange(d ? format(d, 'yyyy-MM-dd') : undefined);
      }}
    />
  </>
);
