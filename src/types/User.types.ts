/**
 * Defines the structure of the user.
 */
export type User = {
  /**
   * The name of the user.
   */
  name: string;
  /**
   * The email of the user.
   */
  email: string;
  /**
   * The phone number of the user.
   */
  phoneNumber?: string;
  /**
   * The id of the city user belongs to.
   */
  city?: number;
  /**
   * The profile picture of the user which
   * can be a string when we store and will be
   * a file when we upload the image.
   */
  profilePicture?: string | File;
};
