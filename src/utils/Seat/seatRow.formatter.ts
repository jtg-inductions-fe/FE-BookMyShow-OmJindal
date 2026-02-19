import { ALPHABET_LENGTH, ASCII_CODE_A } from '@/constants';

/**
 * Converts a seat row index into an alphabetical row label.
 */
export const seatRowFormatter = (row: number): string => {
  if (row <= 0) return '';

  // Subtract 1 to convert the 1-based seat row into a 0-based index.
  const remainder = (row - 1) % ALPHABET_LENGTH;
  const prefix = Math.floor((row - 1) / ALPHABET_LENGTH);

  // Alphabet calculations work like arrays (A = 0, B = 1)
  const currentChar = String.fromCharCode(ASCII_CODE_A + remainder);

  if (prefix === 0) {
    return currentChar;
  }

  return `${seatRowFormatter(prefix)}${currentChar}`;
};
