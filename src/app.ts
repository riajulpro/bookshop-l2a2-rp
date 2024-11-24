import cors from 'cors';
import express, { Application, Request, Response } from 'express';

const app: Application = express();

// Defining the Parsers
app.use(express.json());
app.use(cors());

// Connecting the application routes

const checkServerStatus = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'You are in the bookShop server!',
  });
};

app.get('/', checkServerStatus);

export default app;
