import { model, Schema } from 'mongoose';
import { IBook } from './books.interface';

const bookSchema = new Schema<IBook>({
  title: {
    type: String,
    unique: true,
    required: [true, 'You must enter the title of the book'],
  },
  author: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ['Fiction', 'Science', 'SelfDevelopment', 'Poetry', 'Religious'],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
});

export const Books = model<IBook>('Book', bookSchema);
