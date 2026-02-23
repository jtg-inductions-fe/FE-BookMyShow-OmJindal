import type { ReactNode } from 'react';

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
   * The children component.
   */
  children?: ReactNode;
};

export type SlotCardSkeletonProps = {
  /**
   * The children component
   */
  children?: ReactNode;
};
