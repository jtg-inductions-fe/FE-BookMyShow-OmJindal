/**
 * The props for language filter.
 */
export type LanguageFilterProps = {
  /**
   * The currently selected language IDs.
   */
  value: number[];
  /**
   * Callback fired whenever the selected languages change.
   */
  onChange: (languages: number[]) => void;
};
