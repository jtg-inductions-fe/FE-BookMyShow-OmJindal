import type { ReactNode } from 'react';

/**
 * Represents a data displayed inside the card.
 */
export type InfoItem = {
  /**
   * Label describing the information.
   */
  icon: ReactNode;
  /**
   * Value associated with the label.
   */
  label: string;
};

export type MovieDetailedCardProps = {
  /**
   * The title of the card.
   */
  title: string;
  /**
   * The poster of the card.
   */
  poster?: string;
  /**
   * The description of the card.
   */
  description?: string;
  /**
   * Data to be shown inside the card.
   */
  info?: InfoItem[];
  /**
   * The tag associated with the data.
   */
  tags: string[];
};
