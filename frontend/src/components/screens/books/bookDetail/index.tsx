'use client';

import { getBook } from '@/apis/books';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

type BookDetailScreenProps = {
  bookId: number;
};

export const BookDetailScreen: React.FC<BookDetailScreenProps> = ({ bookId }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['book', bookId],
    queryFn: () => getBook(bookId),
  });
  const router = useRouter();

  if (isLoading || !data) return <Skeleton />;

  return (
    <>
      <Button onClick={() => router.back()}>Back</Button>
      <div className='py-2'>
        <p>
          <span className='font-bold'>Title:</span> {data?.title}
        </p>
        <p>
          <span className='font-bold'>Description:</span> {data?.description}
        </p>
        <p>
          <span className='font-bold'>Date released:</span> {data?.date_released}
        </p>
        <p>
          <span className='font-bold'>Price: </span> ${data?.price}
        </p>
      </div>
    </>
  );
};
