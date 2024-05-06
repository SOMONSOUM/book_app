import { Book, BookInput } from '@/schema/book-schema';
import { clientFetch } from '@/utils/fetch/client';
import { format } from 'date-fns';

export const getBooks = async (): Promise<Book[]> => {
  const response = await clientFetch.get(`books`).json();
  return response as Book[];
};

export const getBook = async (bookId: number): Promise<Book> => {
  const response = await clientFetch.get(`books/${bookId}`).json();
  return response as Book;
};

export const createBook = async (input: BookInput): Promise<Book> => {
  const response = await clientFetch
    .post(`books`, {
      json: {
        date_released: format(input.date_released, 'yyyy-MM-dd'),
        description: input.description,
        price: input.price,
        year: input.year,
        title: input.title,
      },
    })
    .json();

  return response as Book;
};

export const deleteBook = async (bookId: number): Promise<void> => {
  try {
    await clientFetch.delete(`books/${bookId}`).json();
  } catch (error) {
    throw new Error('Failed to delete the book: ' + error);
  }
};

export const updateBook = async (input: Book): Promise<void> => {
  try {
    await clientFetch
      .put(`books/${input.id}`, {
        json: {
          date_released: format(input.date_released, 'yyyy-MM-dd'),
          description: input.description,
          price: input.price,
          year: input.year,
          title: input.title,
        },
      })
      .json();
  } catch (error) {
    throw new Error('Failed to update the book: ' + error);
  }
};
