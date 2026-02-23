import { CheckIcon, ChevronDownIcon, XIcon } from 'lucide-react';

import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/Form';
import { cn } from '@/utils';
import { Combobox as ComboboxPrimitive } from '@base-ui/react';

/**
 * The main container of the combobox component.
 */
export const Combobox = ComboboxPrimitive.Root;

/**
 * The trigger element of the search dropdown.
 */
const ComboboxTrigger = ({ className, children, ...props }: ComboboxPrimitive.Trigger.Props) => (
  <ComboboxPrimitive.Trigger
    data-slot="combobox-trigger"
    className={cn("[&_svg:not([class*='size-'])]:size-4", className)}
    {...props}
  >
    {children}
    <ChevronDownIcon className="text-muted-foreground size-4 pointer-events-none" />
  </ComboboxPrimitive.Trigger>
);

/**
 * The element to clear the combobox input.
 */
const ComboboxClear = ({ className, ...props }: ComboboxPrimitive.Clear.Props) => (
  <ComboboxPrimitive.Clear
    data-slot="combobox-clear"
    className={className}
    {...props}
    render={
      <InputGroupButton variant="ghost" size="icon-xs">
        <XIcon className="pointer-events-none" />
      </InputGroupButton>
    }
  />
);

/**
 * The input element of the combobox.
 */
export const ComboboxInput = ({
  className,
  children,
  disabled = false,
  showTrigger = true,
  showClear = false,
  ...props
}: ComboboxPrimitive.Input.Props & {
  showTrigger?: boolean;
  showClear?: boolean;
}) => (
  <InputGroup className={cn('w-full rounded-full pl-4 h-12', className)}>
    <ComboboxPrimitive.Input
      render={<InputGroupInput disabled={disabled} />}
      disabled={disabled}
      {...props}
    />
    <InputGroupAddon align="inline-end">
      {showTrigger && (
        <ComboboxTrigger
          render={
            <InputGroupButton
              size="icon-sm"
              variant="ghost"
              data-slot="input-group-button"
              className="group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent"
              disabled={disabled}
            />
          }
        />
      )}
      {showClear && <ComboboxClear disabled={disabled} />}
    </InputGroupAddon>
    {children}
  </InputGroup>
);

/**
 * The content of the combobox.
 */
export const ComboboxContent = ({
  className,
  side = 'bottom',
  sideOffset = 6,
  align = 'start',
  alignOffset = 0,
  anchor,
  ...props
}: ComboboxPrimitive.Popup.Props &
  Pick<
    ComboboxPrimitive.Positioner.Props,
    'side' | 'align' | 'sideOffset' | 'alignOffset' | 'anchor'
  >) => (
  <ComboboxPrimitive.Portal>
    <ComboboxPrimitive.Positioner
      side={side}
      sideOffset={sideOffset}
      align={align}
      alignOffset={alignOffset}
      anchor={anchor}
      className="isolate z-50"
    >
      <ComboboxPrimitive.Popup
        data-slot="combobox-content"
        data-chips={!!anchor}
        className={cn(
          'mt-1 bg-popover text-popover-foreground data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 *:data-[slot=input-group]:bg-input/30 *:data-[slot=input-group]:border-input/30 overflow-hidden rounded-lg shadow-md ring-1 duration-100 *:data-[slot=input-group]:m-1 *:data-[slot=input-group]:mb-0 *:data-[slot=input-group]:h-8 *:data-[slot=input-group]:shadow-none data-[side=inline-start]:slide-in-from-right-2 data-[side=inline-end]:slide-in-from-left-2 group/combobox-content relative max-h-(--available-height) w-(--anchor-width) max-w-(--available-width) min-w-[calc(var(--anchor-width)+calc(var(--spacing)*7))] origin-(--transform-origin) data-[chips=true]:min-w-(--anchor-width)',
          className,
        )}
        {...props}
      />
    </ComboboxPrimitive.Positioner>
  </ComboboxPrimitive.Portal>
);

/**
 * The list to be displayed inside the content.
 */
export const ComboboxList = ({ className, ...props }: ComboboxPrimitive.List.Props) => (
  <ComboboxPrimitive.List
    data-slot="combobox-list"
    className={cn(
      'no-scrollbar max-h-[min(--spacing(63),calc(var(--available-height)--spacing(9)))] scroll-py-1 p-1 data-empty:p-0 overflow-y-auto overscroll-contain',
      className,
    )}
    {...props}
  />
);

/**
 * The items of the list.
 */
export const ComboboxItem = ({ className, children, ...props }: ComboboxPrimitive.Item.Props) => (
  <ComboboxPrimitive.Item
    data-slot="combobox-item"
    className={cn(
      "data-highlighted:bg-accent data-highlighted:text-accent-foreground not-data-[variant=destructive]:data-highlighted:**:text-accent-foreground gap-2 rounded-md py-1 pr-8 pl-1.5 text-sm [&_svg:not([class*='size-'])]:size-4 relative flex w-full cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
      className,
    )}
    {...props}
  >
    {children}
    <ComboboxPrimitive.ItemIndicator
      render={
        <span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center">
          <CheckIcon className="pointer-events-none" />
        </span>
      }
    />
  </ComboboxPrimitive.Item>
);

/**
 * The content to be displayed in case combobox-content is empty.
 */
export const ComboboxEmpty = ({ className, ...props }: ComboboxPrimitive.Empty.Props) => (
  <ComboboxPrimitive.Empty
    data-slot="combobox-empty"
    className={cn(
      'text-muted-foreground hidden w-full justify-center py-2 text-center text-sm group-data-empty/combobox-content:flex',
      className,
    )}
    {...props}
  />
);
