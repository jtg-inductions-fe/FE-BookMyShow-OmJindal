/**
 * Valid time formats patterns for time formatting.
 */
export type TimeFormatTypes = 'HHMM A';

/**
 * Configuration structure for TimeConfig object.
 */
export type TimeConfigTypes = {
  /**
   * A string with a BCP 47 language tag.
   */
  locale: Intl.LocalesArgument;
  /**
   * A configuration object for time formatting.
   */
  options: Intl.DateTimeFormatOptions;
};
