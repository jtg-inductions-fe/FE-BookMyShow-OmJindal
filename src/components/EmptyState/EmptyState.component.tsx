import { Typography } from '@/components/Typography';

import type { EmptyStateProps } from './EmptyState.types';

export const EmptyState = ({ description, title }: EmptyStateProps) => (
  <div className="w-full flex flex-col items-center justify-center py-20 text-center gap-3">
    <Typography tag="p" variant="h3">
      {title}
    </Typography>
    <Typography tag="p" color="secondary">
      {description}
    </Typography>
  </div>
);
