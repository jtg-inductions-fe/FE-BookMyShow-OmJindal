import { FilterCheckboxAccordion, FilterCheckboxAccordionSkeleton } from '@/components';
import { useGenreListQuery } from '@/services';

import type { GenreFilterProps } from './GenreFilter.types';

export const GenreFilter = ({ value, onChange }: GenreFilterProps) => {
  const { data = [], isLoading } = useGenreListQuery();

  if (isLoading) {
    return <FilterCheckboxAccordionSkeleton title="Genre" />;
  }

  return (
    <FilterCheckboxAccordion
      title="Genre"
      accordionValue="genre"
      items={data}
      value={value}
      onChange={onChange}
    />
  );
};
