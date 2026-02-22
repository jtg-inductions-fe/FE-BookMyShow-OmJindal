import {
  Accordion,
  AccordionCheckboxSkeleton,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Checkbox,
  Field,
  FieldGroup,
  FieldLabel,
  Typography,
} from '@/components';
import { useLanguageListQuery } from '@/services';

import type { LanguageFilterProps } from './LanguageFilter.types';

export const LanguageFilter = ({ value, onChange }: LanguageFilterProps) => {
  const languageQuery = useLanguageListQuery();
  const languageData = languageQuery.data ?? [];

  const toggleLanguage = (id: number, checked: boolean) => {
    if (checked) {
      onChange([...value, id]);
    } else {
      onChange(value.filter((languageId) => languageId !== id));
    }
  };

  return (
    <Accordion type="single" collapsible key={'language-' + languageData.length}>
      <AccordionItem value="language">
        <AccordionTrigger>
          <Typography tag="h3" variant="h4">
            Language
          </Typography>
        </AccordionTrigger>
        <AccordionContent>
          <FieldGroup>
            {languageQuery.isLoading
              ? Array.from({ length: 5 }).map((_, i) => <AccordionCheckboxSkeleton key={i} />)
              : languageData.map((language) => (
                  <Field key={language.id} orientation="horizontal">
                    <Checkbox
                      id={`language-${language.id}`}
                      checked={value.includes(language.id)}
                      onCheckedChange={(checked) => toggleLanguage(language.id, !!checked)}
                    />
                    <FieldLabel htmlFor={`language-${language.id}`}>{language.name}</FieldLabel>
                  </Field>
                ))}
          </FieldGroup>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
