'use client';

import { BookDetailScreen } from '@/components/screens/books/bookDetail';

function BookDetailPage({ params: { id } }: { params: { id: string; locale: string } }) {
  return <BookDetailScreen bookId={Number(id)} />;
}

export default BookDetailPage;
