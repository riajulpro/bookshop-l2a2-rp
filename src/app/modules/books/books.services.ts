import { IBook } from './books.interface';
import { Books } from './books.model';

const insertNewBook = async (book: IBook) => {
  try {
    const newBook = new Books(book);
    const savedBook = await newBook.save();
    return savedBook;
  } catch (error) {
    throw new Error('Failed to insert new book');
  }
};

const getAllBooks = async (searchTerm: string) => {
  try {
    const query = searchTerm
      ? {
          $or: [
            { title: { $regex: searchTerm, $options: 'i' } },
            { author: { $regex: searchTerm, $options: 'i' } },
            { category: { $regex: searchTerm, $options: 'i' } },
          ],
        }
      : {};

    const allBooks = await Books.find(query);
    return allBooks;
  } catch (error) {
    throw new Error('Failed to fetch books');
  }
};

const getSingleBook = async (bookId: string) => {
  try {
    const singleBook = await Books.findById(bookId);
    return singleBook;
  } catch (error) {
    throw new Error('Failed to fetch the book');
  }
};

const updateSingleBook = async (bookId: string, data: Partial<IBook>) => {
  try {
    const book = await Books.findById(bookId);
    if (!book) {
      return { success: false, message: 'Book not found', data: null };
    }

    const updatedBook = await Books.findByIdAndUpdate(
      bookId,
      { $set: data },
      { new: true },
    );

    return {
      success: true,
      message: 'Book updated successfully',
      data: updatedBook,
    };
  } catch (error) {
    throw new Error('Failed to update book');
  }
};

export const BookServices = {
  insertNewBook,
  getAllBooks,
  getSingleBook,
  updateSingleBook,
};
