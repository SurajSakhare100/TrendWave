import express from 'express';
import Cart from '../models/cart.model.js';
const router = express.Router();

export const CreateOrder= async (req, res) => {
    try {
        const { items, shippingAddress, paymentMethod } = req.body;

        // Here you would typically handle payment processing and save order details to the database

        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to process order' });
    }
};


// Get cart by user ID
const getCart = async (req, res) => {
    const { userId } = req.params;
    try {
        const cart = await Cart.findOne({ userId }).populate('items.productId');
        if (!cart) return res.status(404).json({ message: 'Cart not found' });
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add item to cart
const addItemToCart = async (req, res) => {
    const { userId } = req.params;
    const { productId, price, quantity } = req.body;

    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [], totalPrice: 0 });
        }

        const existingItem = cart.items.find(item => item.productId.toString() === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ productId, price, quantity });
        }

        cart.totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
        await cart.save();

        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Remove item from cart
const removeItemFromCart = async (req, res) => {
    const { userId, productId } = req.params;
    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        cart.items = cart.items.filter(item => item.productId.toString() !== productId);
        cart.totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
        await cart.save();

        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// Update item quantity in cart
const updateItemQuantity = async (req, res) => {
    const { userId, productId } = req.params;
    const { quantity } = req.body;

    try {
        if (isNaN(quantity) || quantity < 0) {
            return res.status(400).json({ message: 'Invalid quantity' });
        }

        // Find the user's cart
        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        // Find the item in the cart
        const itemIndex = cart.items.findIndex(item => item.productId == productId);
        console.log(itemIndex)

        if (itemIndex !== -1) {
            if (quantity <= 0) {
                // Remove item if quantity is zero or less
                cart.items.splice(itemIndex, 1);
            } else {
                // Update the item quantity
                cart.items[itemIndex].quantity = quantity;
            }

            // Recalculate total price
            cart.totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

            // Save the updated cart
            await cart.save();
            res.json(cart);
        } else {
            res.status(404).json({ message: 'Item not found in cart' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export {
    getCart,
    addItemToCart,
    removeItemFromCart,
    updateItemQuantity
};
