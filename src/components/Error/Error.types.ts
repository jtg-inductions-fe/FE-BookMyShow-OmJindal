import type { To } from 'react-router';

export type ErrorComponentProps = {
  /**
   *  Source URL of the Image.
   */
  imgUrl: string;
  /**
   * Alt text for the image (for accessibility).
   */
  imgAltText: string;
  /**
   * Heading of the error component.
   */
  heading: string;
  /**
   * Description of the error component.
   */
  description: string;
  /**
   * Text to be displayed on the button.
   */
  buttonText?: string;
  /**
   * Route to be navigated to
   */
  to?: To;
};
