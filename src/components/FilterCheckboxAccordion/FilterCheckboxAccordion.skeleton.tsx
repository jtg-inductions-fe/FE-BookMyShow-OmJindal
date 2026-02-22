import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/Accordion';
import { Field, FieldGroup } from '@/components/Form';
import { Skeleton } from '@/components/Skeleton';
import { Typography } from '@/components/Typography';

import type { FilterCheckboxAccordionSkeletonProps } from './FilterCheckboxAccordion.types';

export const FilterCheckboxAccordionSkeleton = ({
  title,
}: FilterCheckboxAccordionSkeletonProps) => (
  <Accordion type="single" collapsible>
    <AccordionItem value="loader">
      <AccordionTrigger>
        <Typography tag="h3" variant="h4">
          {title}
        </Typography>
      </AccordionTrigger>
      <AccordionContent>
        <FieldGroup>
          {Array.from({ length: 5 }).map((_, i) => (
            <Field key={i} orientation="horizontal">
              <Skeleton className="size-5 rounded-sm" />
              <Skeleton className="h-5 w-30 ml-2" />
            </Field>
          ))}
        </FieldGroup>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);
