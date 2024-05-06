import { z } from 'zod';

export const BookSchema = z.object({
  id: z.number(),
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }),
  year: z.string().min(4, {
    message: 'Year must be at least 4 digits.',
  }),
  price: z.string().min(1, {
    message: 'Price must be at least 1 digits.',
  }),
  date_released: z.date({ message: 'Date released is required' }),
  description: z.string().min(2, {
    message: 'Description must be at least 2 characters.',
  }),
});

export const BookInputSchema = z.object({
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }),
  year: z.string().min(4, {
    message: 'Year must be at least 4 digits.',
  }),
  price: z.string().min(1, {
    message: 'Price must be at least 1 digits.',
  }),
  date_released: z.date({ message: 'Date released is required' }),
  description: z.string().min(2, {
    message: 'Description must be at least 2 characters.',
  }),
});

export type BookInput = z.infer<typeof BookInputSchema>;
export type Book = z.infer<typeof BookSchema>;
