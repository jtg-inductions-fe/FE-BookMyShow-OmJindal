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
  selectedValue,
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
      value={selectedValue}
      multiple
      autoHighlight
      onValueChange={(values: (T | null | undefined)[]) => {
        const filtered = values.filter((val) => val !== null && val !== undefined);
        onSelect(filtered);
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
