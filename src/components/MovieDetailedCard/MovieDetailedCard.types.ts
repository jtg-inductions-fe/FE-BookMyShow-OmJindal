import type { ReactNode } from 'react';

/**
 * Represents a data displayed inside the card.
 */
export type InfoItem = {
  /**
   * Icon representing the information item.
   */
  icon: ReactNode;
  /**
   * Text label describing the information.
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
   * Image loading behavior.
   * @defaultValue 'eager'
   */
  loading?: 'eager' | 'lazy';
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
