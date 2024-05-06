'use client';

import { useBooks } from '@/hooks/use-books';
import BookTableActions from './components/book-table-action';
import { BookTable } from './components/book-table';
import { DataTableSkeleton } from '@/components/common/data-table-skeleton';

export const BooksScreen = () => {
  const { data: books, isLoading } = useBooks();

  if (!books || isLoading) {
    return <DataTableSkeleton columnCount={5} />;
  }

  return (
    <>
      <BookTableActions />
      <BookTable books={books} />
    </>
  );
};
