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
  ...rest
}: ChipGroupProps<T>) => {
  const map = new Map(data.map((item) => [getId(item), item]));

  return (
    <>
      {ids.map((id) => {
        const item = map.get(id);
        if (!item) return null;

        return (
          <Button
            key={`${title}-${id}`}
            size={size}
            variant={variant}
            {...rest}
            onClick={() => onAction(id)}
          >
            {getLabel(item)}
            {icon && <> {icon}</>}
          </Button>
        );
      })}
    </>
  );
};
