import { Types } from 'mongoose';

export interface IOrder {
  email: string;
  productId: Types.ObjectId;
  quantity: number;
  totalPrice?: number;
}
