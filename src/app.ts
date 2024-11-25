import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import { BookRoutes } from './app/modules/books/books.routes';
import { OrderRoutes } from './app/modules/orders/orders.routes';

const app: Application = express();

// Defining the Parsers
app.use(express.json());
app.use(cors());

// Connecting the application routes
app.use('/api/products', BookRoutes);
app.use('/api/orders', OrderRoutes);

const checkServerStatus = (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'You are in the bookShop server!',
  });
};

app.get('/', checkServerStatus);

// Defining global error handler
app.use(
  (
    error: { statusCode: number; message: string; stack: [] },
    _req: Request,
    res: Response,
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    _next: NextFunction,
  ) => {
    if (error) {
      const statusCode = error.statusCode || 500;

      res.status(statusCode).json({
        message: error.message || 'Internal Server Error',
        success: false,
        error: error,
        stack: error.stack,
      });
    }
  },
);

app.use('*', (_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Opps! You are in the wrong path!',
  });
});

export default app;
