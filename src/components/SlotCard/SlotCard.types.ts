import type { ReactNode } from 'react';

/**
 * Represents a single section inside a group.
 */
type Section = {
  /**
   * Unique identifier of the section.
   */
  id: number;
  /**
   * Display title of the section.
   */
  title: string;
};

/**
 * Represents a selectable time/price option within a section.
 */
type Option = {
  /**
   * Unique identifier of the option.
   */
  id: number;
  /**
   * Price associated with the option.
   */
  price: number;
  /**
   * Start time of the option.
   */
  startTime: string;
};

/**
 * Props for the SlotCard component.
 */
export type SlotCardProps = {
  /**
   * Image URL displayed in the slot card.
   */
  imgUrl: string;
  /**
   * Title of the slot.
   */
  title: string;
  /**
   * Icon element rendered alongside the subtitle.
   */
  icon: ReactNode;
  /**
   * Subtitle of the slot.
   */
  subtitle: string;
  /**
   * Grouped slot data containing sections and their options.
   */
  group: {
    /**
     * Label for the group.
     */
    label: string;
    /**
     * List of sections with their corresponding options.
     */
    sections: Array<{
      /**
       * The data of the section.
       */
      data: Section;
      /**
       * Available options under the section.
       */
      items: Array<Option>;
    }>;
  };
};
