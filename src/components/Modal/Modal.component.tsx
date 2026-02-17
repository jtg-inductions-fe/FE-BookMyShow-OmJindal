import type { ModalProps } from './Modal.types';
import { Button } from '../Button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '../Dialog';
import { Empty, EmptyContent, EmptyHeader, EmptyMedia } from '../Empty';

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
}: ModalProps) => {
  const handleModalVisibility = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleModalVisibility}>
      <DialogContent showCloseButton={false}>
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">{icon}</EmptyMedia>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{subtitle}</DialogDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button variant={'secondary'} onClick={handleModalVisibility} disabled={isLoading}>
              {closeModalText}
            </Button>
            <Button variant="destructive" onClick={handleConfirm} disabled={isLoading}>
              {confirmText}
            </Button>
          </EmptyContent>
        </Empty>
      </DialogContent>
    </Dialog>
  );
};
