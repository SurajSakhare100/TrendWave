import express from 'express';
import { CreateOrder, getOrderById, getAllOrders } from '../controllers/order.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/:userId/create',verifyJWT, CreateOrder);

router.get('/:orderId',verifyJWT, getOrderById);

router.get('/user/:userId',verifyJWT, getAllOrders);

export default router;
