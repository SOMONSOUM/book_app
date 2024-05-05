'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { createBook } from '@/apis/books';

const FormSchema = z.object({
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }),
  year: z.string().min(4, {
    message: 'Year must be at least 4 digits.',
  }),
  price: z.string().min(1, {
    message: 'Price must be at least 1 digits.',
  }),
  date_released: z.string().min(2, {
    message: 'Date released must be at least 2 characters.',
  }),
  description: z.string().min(2, {
    message: 'Description must be at least 2 characters.',
  }),
});

export function BookCreateForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ['create-book'],
    mutationFn: createBook,
  });

  function onSubmit(input: z.infer<typeof FormSchema>) {
    const values = {
      date_released: input.date_released,
      description: input.description,
      price: Number(input.price),
      year: Number(input.year),
      title: input.title,
    };

    mutate(values, {
      onError: (e) => toast(e.message, { closeButton: true }),
      onSuccess: (data) => {
        toast.success('You submitted the following values:', { closeButton: true });
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='ml-4 w-2/3 space-y-6'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder='Enter title' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='price'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input placeholder='Enter price' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='year'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year</FormLabel>
              <FormControl>
                <Input placeholder='Enter year' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='date_released'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date released</FormLabel>
              <FormControl>
                <Input placeholder='Enter date released' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder='Enter description' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending ? true : false} type='submit'>
          Submit
        </Button>
      </form>
    </Form>
  );
}
