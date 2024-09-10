import express from 'express';
import { CreateOrder, getOrderById, getAllOrders } from '../controllers/order.controller.js';

const router = express.Router();

// Route to create a new order
router.post('/:userId/create', CreateOrder);

// Route to get an order by ID
router.get('/:orderId', getOrderById);

// Route to get all orders for a specific user
router.get('/user/:userId', getAllOrders);

export default router;
