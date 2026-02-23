import { Field } from '@/components/Form';
import { Skeleton } from '@/components/Skeleton';

export const AccordionCheckboxSkeleton = () => (
  <Field className="flex items-center gap-3" orientation="horizontal">
    <Skeleton className="h-5 w-5" />
    <Skeleton className="h-4 w-32" />
  </Field>
);
