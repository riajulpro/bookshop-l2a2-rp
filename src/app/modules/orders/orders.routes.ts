import express from 'express';
import { OrderControllers } from './orders.controllers';
const router = express.Router();

router.post('/', OrderControllers.placeAnOrder);
router.get('/revenue', OrderControllers.getTheRevenue);

export const OrderRoutes = router;
