import PopupModal from '@/components/screens/books/components/create-book-modal';
import { BookCreateForm } from './book-create-form';

export default function BookTableActions() {
  return (
    <div className='flex items-center justify-between py-2'>
      <div className='flex gap-3'>
        <PopupModal renderModal={() => <BookCreateForm />} />
      </div>
    </div>
  );
}
