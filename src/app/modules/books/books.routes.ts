import express from 'express';
import { BookControllers } from './books.controllers';

const router = express.Router();

router.post('/', BookControllers.insertNewBook);
router.get('/', BookControllers.getAllBooks);
router.get('/:productId', BookControllers.getSingleBook);
router.put('/:productId', BookControllers.updateSingleBook);

export const BookRoutes = router;
