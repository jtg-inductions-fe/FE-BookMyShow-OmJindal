/**
 * Valid amount formats patterns for amount formatting.
 */
export type AmountFormatTypes = 'INR';

/**
 * Configuration structure for AmountConfig object.
 */
export type AmountConfigTypes = {
  /**
   * A string with a BCP 47 language tag.
   */
  locale: Intl.LocalesArgument;
  /**
   * A configuration object for amount formatting.
   */
  options: Intl.NumberFormatOptions;
};
