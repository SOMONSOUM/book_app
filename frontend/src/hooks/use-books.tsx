import { getBooks } from '@/apis/books';
import { useQuery } from '@tanstack/react-query';

export const useBooks = () => {
  return useQuery({
    queryKey: ['books'],
    queryFn: getBooks,
  });
};
