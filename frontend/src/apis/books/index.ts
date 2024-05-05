import { apiURL } from "@/constants/api-url";
import { clientFetch } from "@/utils/fetch/client";

export interface Book {
  title: string;
  year: number;
  price: number;
  date_released: string;
  description: string;
  id: number;
}

export const getBooks = async (): Promise<Book[]> => {
  const response = await clientFetch.get(`${apiURL}/books`).json();
  return response as Book[];
}

export const getBook = async (bookId: number): Promise<Book> => {
  const response = await clientFetch.get(`${apiURL}/books/${bookId}`).json()
  return response as Book
}

export const createBook = async (input: Omit<Book, 'id'>): Promise<Book> => {
  const response = await clientFetch.post(`${apiURL}/books`, {
    json: input
  }).json()

  return response as Book
}