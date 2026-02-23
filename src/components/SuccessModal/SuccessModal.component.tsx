import { Check } from 'lucide-react';

import { Button } from '@/components/Button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/Dialog';

import type { SuccessModalProps } from './SuccessModal.types';

/**
 * Modal component used to display a confirmation dialog box.
 */
export const SuccessModal = ({
  open,
  title,
  description,
  onSecondary,
  secondaryLabel,
  primaryLabel,
  onPrimary,
  children,
}: SuccessModalProps) => (
  <Dialog open={open}>
    <DialogContent showCloseButton={false}>
      <div className="flex flex-col items-center justify-center gap-5 rounded-lg text-center text-balance p-4 sm:p-8">
        <div className="flex max-w-lg flex-col items-center gap-3 text-center">
          <div className="flex items-center justify-center text-success rounded-full bg-success/20 size-25">
            <Check className="h-10 w-10" />
          </div>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </div>
        {children}
        <div className="flex flex-col justify-center sm:flex-row w-full min-w-0 items-center gap-4 *:w-full sm:*:w-1/2">
          {primaryLabel && <Button onClick={onPrimary}>{primaryLabel}</Button>}
          {secondaryLabel && (
            <Button variant="secondary" onClick={onSecondary}>
              {secondaryLabel}
            </Button>
          )}
        </div>
      </div>
    </DialogContent>
  </Dialog>
);
