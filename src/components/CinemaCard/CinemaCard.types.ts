import type { ReactNode } from 'react';

/**
 * Props for Cinema Card component.
 */
export type CinemaCardProps = {
  /**
   * The URL of the image.
   */
  imgUrl: string;
  /**
   * The title of the component.
   */
  title: string;
  /**
   * The subtitle of the component.
   */
  subtitle: string;
  /**
   * The icon to be displayed beside the subtitle.
   */
  icon: ReactNode;
};
