import { FilterCheckboxAccordion } from '@/components';
import { useGenreListQuery } from '@/services';

import type { GenreFilterProps } from './GenreFilter.types';

export const GenreFilter = ({ value, onChange }: GenreFilterProps) => {
  const { data = [], isLoading } = useGenreListQuery();
  return (
    <FilterCheckboxAccordion
      title="Genre"
      accordionValue="genre"
      items={data}
      isLoading={isLoading}
      value={value}
      onChange={onChange}
    />
  );
};
