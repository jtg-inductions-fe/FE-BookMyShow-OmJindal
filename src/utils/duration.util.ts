/**
 * Converts a duration string into a human readable label.
 */
export const formatDurationLabel = (duration?: string | null): string => {
  if (!duration) return '';

  const parts = duration.split(':');

  const hours = Number(parts[0]);
  const minutes = Number(parts[1]);

  if (isNaN(hours) || isNaN(minutes)) return '';

  return `${hours}h ${minutes}m`;
};
