'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { useBooks } from '@/hooks/use-books';
import BookTableActions from './components/book-table-action';
import { BookTable } from './components/book-table';

export const BooksScreen = () => {
  const { data: books, isLoading } = useBooks();

  if (!books || isLoading) {
    return <Skeleton />;
  }

  return (
    <>
      <BookTableActions />
      <BookTable books={books} />
    </>
  );
};
