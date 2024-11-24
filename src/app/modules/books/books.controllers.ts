import { NextFunction, Request, Response } from 'express';
import { BookServices } from './books.services';
import bookValidationSchema from './books.validation';

const insertNewBook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const bookInfo = req.body;

    // Validate the request data
    const validatedData = bookValidationSchema.parse(bookInfo);

    // Insert the book
    const insertedBook = await BookServices.insertNewBook(validatedData);

    res.status(201).json({
      success: true,
      message: 'Book successfully inserted!',
      data: insertedBook,
    });
  } catch (error) {
    next(error);
  }
};

const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { searchTerm } = req.query;

    // Fetch all books based on searchTerm
    const allBooks = await BookServices.getAllBooks(searchTerm as string);

    res.status(200).json({
      success: true,
      message: 'All books retrieved successfully!',
      data: allBooks,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleBook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { productId: bookId } = req.params;

    // Fetch the single book
    const singleBook = await BookServices.getSingleBook(bookId);

    if (!singleBook) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Book retrieved successfully!',
      data: singleBook,
    });
  } catch (error) {
    next(error);
  }
};

const updateSingleBook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { productId: bookId } = req.params;
    const updateData = req.body;

    // Update the book
    const result = await BookServices.updateSingleBook(bookId, updateData);

    if (!result.success) {
      return res.status(404).json({
        success: false,
        message: result.message,
      });
    }

    res.status(200).json({
      success: true,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

const deleteSingleBook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { productId: bookId } = req.params;

    // Delete the book
    const result = await BookServices.deleteSingleBook(bookId);

    if (!result.success) {
      return res.status(404).json({
        success: false,
        message: result.message,
      });
    }

    res.status(200).json({
      success: true,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

export const BookControllers = {
  insertNewBook,
  getAllBooks,
  getSingleBook,
  updateSingleBook,
  deleteSingleBook,
};
