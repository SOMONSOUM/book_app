import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { ScrollArea } from '../../../ui/scroll-area';

type TCreateBookModalProps = {
  onConfirm?: () => void;
  loading?: boolean;
  renderModal: (onClose: () => void) => React.ReactNode;
};
export default function CreateBookModal({ renderModal }: TCreateBookModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  return (
    <>
      <Button className='text-xs md:text-sm' onClick={() => setIsOpen(true)}>
        <Plus className='mr-2 h-4 w-4' /> Add New
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} className={'!bg-background !px-1'}>
        <ScrollArea className='h-[60dvh] px-6'>{renderModal(onClose)}</ScrollArea>
      </Modal>
    </>
  );
}
