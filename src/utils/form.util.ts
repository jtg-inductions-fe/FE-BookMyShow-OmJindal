/**
 * Converts an object to FormData.
 */
export const buildFormData = (data: Record<string, string | Blob>): FormData => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (data[key]) {
      formData.append(key, value);
    }
  });
  return formData;
};
