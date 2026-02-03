import type { To } from 'react-router';

/**
 * Base props for the Error component.
 */
type ErrorComponentBaseProps = {
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
};

/**
 * Props when the error component includes button.
 */
type WithButton = {
  /**
   * Text to be displayed on the button.
   */
  buttonText: string;
  /**
   * Route to be navigated to
   */
  to: To;
};

/**
 * Props when the error component does not
 * includes button.
 */
type WithoutButton = {
  buttonText?: never;
  to?: never;
};

/**
 * Props for the Error component.
 */
export type ErrorComponentProps = ErrorComponentBaseProps & (WithButton | WithoutButton);
