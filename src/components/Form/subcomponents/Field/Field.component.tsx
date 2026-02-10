import { type ComponentProps, useMemo } from 'react';

import type { VariantProps } from 'class-variance-authority';

import { Root } from '@radix-ui/react-label';

import { cn } from '@/utils';

import { fieldVariants } from './Field.styles';

/**
 * Label component.
 *
 * Wraps Radix Label `Root` and provides consistent styling.
 */
const Label = ({ className, ...props }: ComponentProps<typeof Root>) => (
  <Root
    data-slot="label"
    className={cn(
      'flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
      className,
    )}
    {...props}
  />
);

/**
 * FieldGroup component.
 *
 * Acts as a wrapper for one or more related fields.
 */
export const FieldGroup = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    data-slot="field-group"
    className={cn(
      'group/field-group @container/field-group flex w-full flex-col gap-2 data-[slot=checkbox-group]:gap-3 *:data-[slot=field-group]:gap-4',
      className,
    )}
    {...props}
  />
);

/**
 * Field container component.
 *
 * Provides grouping for form label and
 * input elements.
 */
export const Field = ({
  className,
  orientation = 'vertical',
  ...props
}: ComponentProps<'div'> & VariantProps<typeof fieldVariants>) => (
  <div
    role="group"
    data-slot="field"
    data-orientation={orientation}
    className={cn(fieldVariants({ orientation }), className)}
    {...props}
  />
);

/**
 * FieldLabel component.
 *
 * Wraps the form control label and applies
 * state-aware styling.
 */
export const FieldLabel = ({ className, ...props }: ComponentProps<typeof Label>) => (
  <Label
    data-slot="field-label"
    className={cn(
      'font-inter ml-0.5 group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50',
      'has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border *:data-[slot=field]:p-4',
      'has-data-[state=checked]:bg-primary/5 has-data-[state=checked]:border-primary dark:has-data-[state=checked]:bg-primary/10',
      className,
    )}
    {...props}
  />
);

/**
 * FieldError component.
 *
 * Displays validation errors associated with a field.
 */
export const FieldError = ({
  className,
  children,
  errors,
  ...props
}: ComponentProps<'div'> & {
  errors?: Array<{ message?: string } | undefined>;
}) => {
  const content = useMemo(() => {
    if (children) {
      return children;
    }

    if (!errors?.length) {
      return '';
    }

    const uniqueErrors = [...new Map(errors.map((error) => [error?.message, error])).values()];

    if (uniqueErrors?.length === 1) {
      return uniqueErrors[0]?.message;
    }

    return (
      <ul className="ml-4 flex list-disc flex-col gap-1">
        {uniqueErrors.map((error, index) => error?.message && <li key={index}>{error.message}</li>)}
      </ul>
    );
  }, [children, errors]);

  if (!content) {
    return null;
  }

  return (
    <div
      aria-live="polite"
      data-slot="field-error"
      className={cn('ml-0.5 text-destructive text-sm font-normal min-h-5', className)}
      {...props}
    >
      {content}
    </div>
  );
};
