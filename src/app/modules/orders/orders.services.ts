import { Types } from 'mongoose';
import { IOrder } from './orders.interface';
import { Order } from './orders.model';
import { IValidatedOrder } from './orders.validation';
import { Books } from '../books/books.model';

const placeAnOrder = async (order: IValidatedOrder) => {
  try {
    // find out the book
    const book = await Books.findById(order.productId);

    // if book doesn't exist
    if (!book) {
      return {
        success: false,
        message: 'Sorry! there is no book found!',
        data: {},
        status: 404,
      };
    }

    // check the quantity
    if (book.quantity < order.quantity || book.inStock === false) {
      return {
        success: false,
        message: 'Insufficient stock for the requested quantity',
        data: {},
        status: 400,
      };
    }

    // updating the book quantity and save
    book.quantity -= order.quantity;
    if (book.quantity === 0) {
      book.inStock = false;
    }
    await book.save();

    // calculate the totalPrice
    const totalPrice = order.quantity * book.price;

    // create the order object
    const orderData: IOrder = {
      ...order,
      productId: new Types.ObjectId(order.productId),
      totalPrice,
    };

    // save the data into the db
    const placeOrder = new Order(orderData);
    await placeOrder.save();

    return {
      success: true,
      message: 'Order successfully placed!',
      data: placeOrder,
      status: 201,
    };
  } catch (error) {
    throw new Error('Opps! Order failed to place!');
  }
};

const getTheRevenue = async () => {
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: '$totalPrice',
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalRevenue: 1,
        },
      },
    ]);

    return result[0]?.totalRevenue.toFixed(2) || '0.00';
  } catch (error) {
    throw new Error('Revenue retrieve failed!');
  }
};

export const OrderServices = {
  placeAnOrder,
  getTheRevenue,
};
