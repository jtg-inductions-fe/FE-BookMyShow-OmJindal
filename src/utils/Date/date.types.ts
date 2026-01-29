/**
 * Valid date formats patterns for date formatting.
 */
export type DateFormatTypes = 'DDMMYY';

/**
 * Configuration structure for DateConfig object.
 */
export type DateConfigTypes = {
  /**
   * A string with a BCP 47 language tag.
   */
  locale: Intl.LocalesArgument;
  /**
   * A configuration object for date formatting.
   */
  options: Intl.DateTimeFormatOptions;
};
