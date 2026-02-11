/**
 * Converts a seat row index into an alphabetical row label.
 */
export const seatRowFormatter = (row: number): string => {
  if (row <= 0) return '';

  const remainder = (row - 1) % 26;
  const prefix = Math.floor((row - 1) / 26);

  const currentChar = String.fromCharCode(65 + remainder);

  if (prefix === 0) {
    return currentChar;
  }

  return `${seatRowFormatter(prefix)}${currentChar}`;
};
