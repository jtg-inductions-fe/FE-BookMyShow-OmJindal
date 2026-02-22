import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { Accordion as AccordionPrimitive } from 'radix-ui';
import type { ComponentProps } from 'react';

import { cn } from '@/utils';

/**
 * The main container of the accordion component.
 */
export const Accordion = ({
  className,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Root>) => (
  <AccordionPrimitive.Root
    data-slot="accordion"
    className={cn('flex w-full flex-col', className)}
    {...props}
  />
);

/**
 * The trigger element of the accordion.
 */
export const AccordionTrigger = ({
  className,
  children,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Trigger>) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      data-slot="accordion-trigger"
      className={cn(
        'focus-visible:ring-ring/50 focus-visible:border-ring focus-visible:after:border-ring **:data-[slot=accordion-trigger-icon]:text-muted-foreground rounded-lg py-2.5 text-left focus-visible:ring-3 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 group/accordion-trigger relative flex flex-1 items-start justify-between border border-transparent transition-all outline-none disabled:pointer-events-none disabled:opacity-50',
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon
        data-slot="accordion-trigger-icon"
        className="pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden"
      />
      <ChevronUpIcon
        data-slot="accordion-trigger-icon"
        className="pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline"
      />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
);

/**
 * The content of the accordion component.
 */
export const AccordionContent = ({
  className,
  children,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Content>) => (
  <AccordionPrimitive.Content
    data-slot="accordion-content"
    className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up text-sm overflow-hidden"
    {...props}
  >
    <div
      className={cn(
        'pt-0 pb-2.5 [&_a]:hover:text-foreground [&_a]:underline [&_a]:underline-offset-3 [&_p:not(:last-child)]:mb-4',
        className,
      )}
    >
      {children}
    </div>
  </AccordionPrimitive.Content>
);

/**
 * The item of the accordion content.
 */
export const AccordionItem = ({
  className,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Item>) => (
  <AccordionPrimitive.Item
    data-slot="accordion-item"
    className={cn('not-last:border-b', className)}
    {...props}
  />
);
