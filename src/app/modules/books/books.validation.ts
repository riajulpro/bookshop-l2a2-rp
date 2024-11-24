import { z } from 'zod';

const bookValidationSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author is required'),
  price: z.number().positive('Price must be a positive number'),
  category: z.enum([
    'Fiction',
    'Science',
    'SelfDevelopment',
    'Poetry',
    'Religious',
  ]),
  description: z.string().min(1, 'Description is required'),
  quantity: z
    .number()
    .int('Quantity must be an integer')
    .nonnegative('Quantity cannot be negative'),
  inStock: z.boolean().optional(),
});

export default bookValidationSchema;
