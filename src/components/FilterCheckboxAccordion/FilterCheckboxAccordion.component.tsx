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
  const toggle = (id: number, checked: boolean) =>
    onChange(checked ? [...value, id] : value.filter((valueId) => valueId !== id));

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={accordionValue}>
        <AccordionTrigger>
          <Typography tag="h3" variant="h4">
            {title}
          </Typography>
        </AccordionTrigger>
        <AccordionContent>
          <FieldGroup>
            {items.map((item) => (
              <Field key={item.id} orientation="horizontal">
                <Checkbox
                  id={`${accordionValue}-${item.id}`}
                  checked={value.includes(item.id)}
                  onCheckedChange={(checked) => toggle(item.id, !!checked)}
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
