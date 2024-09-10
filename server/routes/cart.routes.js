import express from 'express';
import { addItemToCart, getCart, removeItemFromCart, updateItemQuantity } from '../controllers/cart.controller.js';

const router = express.Router();

// Routes
router.get('/:userId', getCart);
router.post('/:userId', addItemToCart);

// Route to get the cart for a specific user
router.get('/:userId', getCart);

// Route to remove an item from the cart
router.delete('/:userId/:productId', removeItemFromCart);

// Route to update an item's quantity in the cart
router.put('/:userId/:productId', updateItemQuantity);

export default router;
