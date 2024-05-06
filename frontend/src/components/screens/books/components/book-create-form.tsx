'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBook } from '@/apis/books';
import { Textarea } from '@/components/ui/textarea';
import { BookInput, BookSchema } from '@/schema/book-schema';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/utils/cn';

export function BookCreateForm() {
  const form = useForm<BookInput>({
    resolver: zodResolver(BookSchema),
  });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ['create-book'],
    mutationFn: createBook,
  });

  const onSubmit = (input: BookInput) => {
    const values = {
      date_released: input.date_released,
      description: input.description,
      price: input.price,
      year: input.year,
      title: input.title,
    };

    mutate(values, {
      onError: (err) => toast(err.message),
      onSuccess: async () => {
        toast.success('Book has been created!');
        await queryClient.invalidateQueries({
          queryKey: ['books'],
        });
        form.reset({
          title: '',
          date_released: new Date(),
          description: '',
          year: '',
          price: '',
        });
      },
    });
  };

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
            <FormItem className='flex flex-col'>
              <FormLabel>Date released</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}>
                      {field.value ? format(field.value, 'PPP') : <span>Pick date released</span>}
                      <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={field.value || undefined}
                    onDayClick={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>Date reseased book</FormDescription>
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
                <Textarea placeholder='Enter description' {...field} />
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
