import { Button } from '@/components//Button';
import { Chip } from '@/components/Chip';
import { Typography } from '@/components/Typography';

import type { BookingCardProps } from './BookingCard.types';

export const BookingCard = ({
  title,
  description,
  status = 'neutral',
  badgeText,
  info,
  actionLabel,
  loading,
  onAction,
  disabled,
}: BookingCardProps) => {
  const statusBarClass =
    status === 'error' ? 'bg-error' : status === 'success' ? 'bg-success' : 'bg-secondary/50';

  const badgeVariant =
    status === 'error' ? 'outline' : status === 'success' ? 'success' : 'secondary';

  return (
    <article
      className={`h-full flex rounded-xl border-2 bg-white ${disabled ? 'opacity-50' : 'opacity-100'}`}
    >
      <div className={`w-2 rounded-l-xl ${statusBarClass}`} />

      <div className="flex-1 p-4">
        <div className="flex items-start justify-between">
          <Typography variant="h3" tag="h2">
            {title}
          </Typography>
          {badgeText && <Chip variant={badgeVariant}>{badgeText}</Chip>}
        </div>

        {description && <Typography color="secondary">{description}</Typography>}

        {info && info.length > 0 && (
          <div className="mt-3 space-y-3 text-sm">
            {info.map((item) => (
              <div key={item.label}>
                <Typography variant="small" tag="h3" color="secondary">
                  {item.label}
                </Typography>
                <Typography color="primary" tag="p" variant="h6">
                  {item.value}
                </Typography>
              </div>
            ))}
          </div>
        )}

        {actionLabel && onAction && (
          <div className="mt-4">
            <Button onClick={onAction} variant="outline" size="sm" disabled={loading}>
              {actionLabel}
            </Button>
          </div>
        )}
      </div>
    </article>
  );
};
