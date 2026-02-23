import { FilterCheckboxAccordion, FilterCheckboxAccordionSkeleton } from '@/components';
import { useLanguageListQuery } from '@/services';

import type { LanguageFilterProps } from './LanguageFilter.types';

export const LanguageFilter = ({ value, onChange }: LanguageFilterProps) => {
  const { data = [], isLoading } = useLanguageListQuery();

  if (isLoading) {
    return <FilterCheckboxAccordionSkeleton title="Language" />;
  }

  return (
    <FilterCheckboxAccordion
      title="Language"
      accordionValue="language"
      items={data}
      value={value}
      onChange={onChange}
    />
  );
};
