import type { FilterCheckboxAccordionProps } from './FilterCheckboxAccordian.types';
import {
  Accordion,
  AccordionCheckboxSkeleton,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../Accordion';
import { Checkbox, Field, FieldGroup, FieldLabel } from '../Form';
import { Typography } from '../Typography';

export const FilterCheckboxAccordion = ({
  title,
  accordionValue,
  items,
  isLoading,
  value,
  onChange,
}: FilterCheckboxAccordionProps) => {
  const toggle = (id: number, checked: boolean) =>
    onChange(checked ? [...value, id] : value.filter((valudId) => valudId !== id));

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
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => <AccordionCheckboxSkeleton key={i} />)
              : items.map((item) => (
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
