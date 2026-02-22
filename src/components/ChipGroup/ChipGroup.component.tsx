import { Button } from '@/components/Button';

import type { ChipGroupProps } from './ChipGroup.types';

export const ChipGroup = <T,>({
  ids,
  data,
  getId,
  getLabel,
  onAction,
  icon,
  title,
  variant = 'primary',
  size = 'chip',
}: ChipGroupProps<T>) => (
  <>
    {ids.map((id) => {
      const item = data.find((x) => getId(x) === id);
      if (!item) return null;

      return (
        <Button key={`${title}-${id}`} size={size} variant={variant} onClick={() => onAction(id)}>
          {getLabel(item)}
          {icon && <> {icon}</>}
        </Button>
      );
    })}
  </>
);
