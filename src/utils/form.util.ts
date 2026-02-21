/**
 * Converts an object to FormData.
 */
export const buildFormData = (data: Record<string, string | Blob | undefined>): FormData => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (typeof value === 'string') {
      formData.append(key, value ?? '');
    } else if (value) {
      formData.append(key, value);
    }
  });
  return formData;
};

/**
 * Function to compare values of two objects.
 */
export const areFieldsEqual = (
  formData: Record<string, unknown>,
  originalData: Record<string, unknown>,
): boolean =>
  Object.keys(formData).every((key) => {
    if (!originalData.hasOwnProperty(key)) {
      return false;
    }
    return formData[key] === originalData[key];
  });
