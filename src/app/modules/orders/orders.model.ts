import { model, Schema } from 'mongoose';
import { IOrder } from './orders.interface';

const orderSchema = new Schema<IOrder>({
  email: {
    type: String,
    required: [true, 'You must enter the email address.'],
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Book',
    required: [true, 'You must add the product ID here.'],
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'You must include at least one quantity'],
  },
  totalPrice: {
    type: Number,
  },
});

export const Order = model<IOrder>('Order', orderSchema);
