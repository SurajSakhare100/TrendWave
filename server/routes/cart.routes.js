import express from 'express';
import { addToCart, getCart, removeFromCart, clearCart, updateItemQuantity } from '../controllers/cart.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Route to add item to cart or update the cart
router.post('/', verifyJWT, addToCart);

// Route to get the user's cart
router.get('/', verifyJWT, getCart);

// Route to remove an item from the cart
router.delete('/:productId', verifyJWT, removeFromCart);

// Route to clear the user's cart
router.delete('/', verifyJWT, clearCart);
router.put('/', verifyJWT, updateItemQuantity);

export default router;
