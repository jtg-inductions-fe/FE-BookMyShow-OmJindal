import { Button } from '@/components/Button';
import { Chip } from '@/components/Chip';
import { Typography } from '@/components/Typography';

import { STYLES_CONFIG } from './BookingCard.config';
import type { BookingCardProps } from './BookingCard.types';

export const BookingCard = ({
  title,
  description,
  status,
  badgeText,
  info,
  actionLabel,
  onAction,
  disabled,
}: BookingCardProps) => {
  const resolvedStatus = status ?? 'default';
  const { statusBarClass, badgeVariant } = STYLES_CONFIG[resolvedStatus];

  return (
    <article className={`h-full flex rounded-xl border-2 bg-white`}>
      <div className={`w-2 rounded-l-xl ${statusBarClass}`} />

      <div className="flex-1 p-4">
        <div className="flex items-start justify-between">
          <Typography variant="h3" tag="span">
            {title}
          </Typography>
          {badgeText && <Chip variant={badgeVariant}>{badgeText}</Chip>}
        </div>

        {description && <Typography color="secondary">{description}</Typography>}

        {info && info.length > 0 && (
          <div className="mt-3 space-y-3 text-sm">
            {info.map((item, index) => (
              <div key={`${item.label}-${index}`}>
                <Typography variant="small" tag="span" color="secondary">
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
            <Button
              onClick={onAction}
              variant="destructive-soft"
              size="sm"
              disabled={disabled}
              aria-label={`${actionLabel} for ${title}`}
            >
              {actionLabel}
            </Button>
          </div>
        )}
      </div>
    </article>
  );
};
