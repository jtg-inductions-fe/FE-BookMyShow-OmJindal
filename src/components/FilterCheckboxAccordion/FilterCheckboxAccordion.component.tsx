import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/Accordion';
import { Checkbox, Field, FieldGroup, FieldLabel } from '@/components/Form';
import { Typography } from '@/components/Typography';

import type { FilterCheckboxAccordionProps } from './FilterCheckboxAccordion.types';

export const FilterCheckboxAccordion = ({
  title,
  accordionValue,
  items,
  value,
  onChange,
}: FilterCheckboxAccordionProps) => {
  const toggle = (name: string, checked: boolean) =>
    onChange(checked ? [...value, name] : value.filter((valueName) => valueName !== name));

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={accordionValue}>
        <AccordionTrigger>
          <Typography tag="h3" variant="h4" title={title} lineClamp={2}>
            {title}
          </Typography>
        </AccordionTrigger>
        <AccordionContent>
          <FieldGroup>
            {items.map((item) => (
              <Field key={item.id} orientation="horizontal">
                <Checkbox
                  id={`${accordionValue}-${item.id}`}
                  checked={value.includes(item.name)}
                  onCheckedChange={(checked) => toggle(item.name, !!checked)}
                />
                <FieldLabel htmlFor={`${accordionValue}-${item.id}`}>{item.name}</FieldLabel>
              </Field>
            ))}
          </FieldGroup>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
