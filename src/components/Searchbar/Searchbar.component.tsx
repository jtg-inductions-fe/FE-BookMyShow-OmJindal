import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ComboBox';

import type { SearchbarProps } from './Searchbar.types';

export function Searchbar<T>({
  items,
  value,
  placeholder,
  emptyLabel,
  onChange,
  onSelect,
  renderItem,
  getKey,
}: SearchbarProps<T>) {
  return (
    <Combobox
      items={items}
      autoHighlight
      onValueChange={(val: T | null | undefined) => {
        if (!val) return;
        onSelect(val);
      }}
    >
      <ComboboxInput
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      <ComboboxContent>
        <ComboboxEmpty>{emptyLabel}</ComboboxEmpty>

        <ComboboxList>
          {(item: T) => (
            <ComboboxItem key={getKey(item)} value={item}>
              {renderItem(item)}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
