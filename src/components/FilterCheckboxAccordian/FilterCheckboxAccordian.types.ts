/**
 * Represents a selectable filter option.
 */
export type FilterItem = {
  /**
   * Unique identifier of the filter item.
   */
  id: number;
  /**
   * The label of the item.
   */
  name: string;
};

/**
 * Props for the FilterCheckboxAccordion component.
 */
export type FilterCheckboxAccordionProps = {
  /**
   * Title displayed at the top of the accordion.
   */
  title: string;
  /**
   * Unique value used to control accordion open/close state.
   */
  accordionValue: string;
  /**
   * List of filter options to render as checkboxes.
   */
  items: FilterItem[];
  /**
   * Whether the filter list is currently loading.
   */
  isLoading: boolean;
  /**
   * Currently selected filter item IDs.
   */
  value: number[];
  /**
   * Callback fired when selected IDs change.
   */
  onChange: (ids: number[]) => void;
};
