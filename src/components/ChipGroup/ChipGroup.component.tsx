import { Chip } from '@/components/Chip';

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
        <Chip key={`${title}-${id}`} size={size} variant={variant} onClick={() => onAction(id)}>
          {getLabel(item)} {icon}
        </Chip>
      );
    })}
  </>
);
