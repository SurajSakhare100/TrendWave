// routes/payment.js

import express from 'express';
import {createOrderPay, verifyPayment} from '../controllers/payment.controller.js';
const router = express.Router();

router.post('/create-order', createOrderPay);

router.post('/verify-payment', verifyPayment);
export default router;