import { Button } from '@/components/Button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/Dialog';

import type { ConfirmationModalProps } from './ConfirmationModal.types';

/**
 * Modal component used to display a confirmation dialog box.
 */
export const ConfirmationModal = ({
  open,
  onOpenChange,
  icon,
  title,
  description,
  cancelLabel,
  actionLabel,
  onCancel,
  onAction,
  loading,
}: ConfirmationModalProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent showCloseButton={false}>
      <div className="flex flex-col items-center justify-center gap-5 rounded-lg text-center text-balance p-4 sm:p-8">
        <div className="flex max-w-lg flex-col items-center gap-3 text-center">
          {icon && (
            <div className="flex items-center justify-center text-error p-2 rounded-full bg-muted size-14">
              {icon}
            </div>
          )}
          {title && <DialogTitle>{title}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
        </div>

        <div className="flex flex-col justify-center sm:flex-row w-full min-w-0 items-center gap-4 *:w-full sm:*:w-auto">
          {cancelLabel && (
            <Button variant="secondary" onClick={onCancel} disabled={loading}>
              {cancelLabel}
            </Button>
          )}

          {actionLabel && (
            <Button variant="destructive" onClick={onAction} disabled={loading}>
              {actionLabel}
            </Button>
          )}
        </div>
      </div>
    </DialogContent>
  </Dialog>
);
