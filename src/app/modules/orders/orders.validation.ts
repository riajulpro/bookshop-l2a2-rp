import { Types } from 'mongoose';
import { z } from 'zod';

export const orderValidationSchema = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .nonempty('You must enter the email address.'),
  productId: z.string().refine((id) => Types.ObjectId.isValid(id), {
    message: 'Invalid product ID',
  }),
  quantity: z.number().min(1, 'You must include at least one quantity'),
  totalPrice: z
    .number()
    .positive('Total price must be a positive number')
    .optional(),
});

export type IValidatedOrder = z.infer<typeof orderValidationSchema>;
