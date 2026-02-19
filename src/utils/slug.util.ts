/**
 * Helper function to generate slug of a given string.
 */
export const slugGenerator = (value: string): string => {
  const slug = value.toLocaleLowerCase().split(' ').join('-');
  return slug;
};
