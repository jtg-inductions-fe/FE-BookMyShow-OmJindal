import { FilterCheckboxAccordion } from '@/components';
import { useLanguageListQuery } from '@/services';

import type { LanguageFilterProps } from './LanguageFilter.types';

export const LanguageFilter = ({ value, onChange }: LanguageFilterProps) => {
  const { data = [], isLoading } = useLanguageListQuery();

  return (
    <FilterCheckboxAccordion
      title="Language"
      accordionValue="language"
      items={data}
      isLoading={isLoading}
      value={value}
      onChange={onChange}
    />
  );
};
