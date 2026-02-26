/**
 * The props for language filter.
 */
export type LanguageFilterProps = {
  /**
   * The currently selected language IDs.
   */
  value: string[];
  /**
   * Callback fired whenever the selected languages change.
   */
  onChange: (languages: string[]) => void;
};
