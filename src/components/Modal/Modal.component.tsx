import type { ModalProps } from './Modal.types';
import { Button } from '../Button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '../Dialog';
import { Empty, EmptyFooter, EmptyHeader, EmptyMedia } from '../Empty';

/**
 * Modal component used to display a confirmation dialog box.
 */
export const Modal = ({
  isOpen,
  setIsOpen,
  icon,
  title,
  subtitle,
  closeModalText,
  confirmText,
  handleConfirm,
  isLoading,
}: ModalProps) => (
  <Dialog open={isOpen}>
    <DialogContent showCloseButton={false}>
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">{icon}</EmptyMedia>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{subtitle}</DialogDescription>
        </EmptyHeader>
        <EmptyFooter>
          <Button
            variant={'secondary'}
            onClick={() => {
              setIsOpen((prev) => !prev);
            }}
          >
            {closeModalText}
          </Button>
          <Button variant="destructive" onClick={handleConfirm} disabled={isLoading}>
            {confirmText}
          </Button>
        </EmptyFooter>
      </Empty>
    </DialogContent>
  </Dialog>
);
