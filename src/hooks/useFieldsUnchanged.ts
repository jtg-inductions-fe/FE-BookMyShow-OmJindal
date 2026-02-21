import { useMemo } from 'react';

/**
 * Returns true if form fields are unchanged.
 */
export const useFieldsUnchanged = (
  formData: Record<string, unknown>,
  originalData: Record<string, unknown>,
): boolean =>
  useMemo(
    () =>
      Object.keys(formData).every((key) => {
        if (!originalData.hasOwnProperty(key)) {
          return false;
        }
        return formData[key] === originalData[key];
      }),
    [formData, originalData],
  );
