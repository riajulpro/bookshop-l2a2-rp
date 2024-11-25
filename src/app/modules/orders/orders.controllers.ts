import { NextFunction, Request, Response } from 'express';
import { orderValidationSchema } from './orders.validation';
import { OrderServices } from './orders.services';

const placeAnOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // getting order data from the body
    const order = req.body;

    // validate the order
    const validatedOrder = orderValidationSchema.parse(order);

    // handling the data to store into the db
    const result = await OrderServices.placeAnOrder(validatedOrder);

    // sending response
    res.status(result.status || 200).json({
      success: result.success,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

const getTheRevenue = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const calculatedRevenue = await OrderServices.getTheRevenue();

    res.status(200).json({
      success: true,
      message: 'Revenue calculated successfully',
      data: {
        totalRevenue: parseFloat(calculatedRevenue),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const OrderControllers = {
  placeAnOrder,
  getTheRevenue,
};
