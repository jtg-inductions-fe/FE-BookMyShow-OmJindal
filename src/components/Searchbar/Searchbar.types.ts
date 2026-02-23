export type SearchbarProps<T> = {
  /**
   * Array of items displayed in the combobox list.
   */
  items: T[];
  /**
   * Current input value shown inside the search field.
   */
  value: string;
  /**
   * Placeholder text displayed when the input is empty.
   */
  placeholder: string;
  /**
   * Label shown when no matching items are found.
   */
  emptyLabel: string;
  /**
   * Callback triggered when the input value changes.
   */
  onChange: (val: string) => void;
  /**
   * Callback triggered when an item is selected.
   */
  onSelect: (val: T) => void;
  /**
   * Function used to render each item inside the list.
   */
  renderItem: (item: T) => React.ReactNode;
  /**
   * Function used to extract a unique key for each item.
   */
  getKey: (item: T) => string | number;
};
