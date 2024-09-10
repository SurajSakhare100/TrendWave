import express from 'express';
import Cart from '../models/cart.model.js';
const router = express.Router();


// Get Cart by User ID
const getCart = async (req, res) => {
    const { userId } = req.params;
    try {
        const cart = await Cart.findOne({ userId }).populate('items.productId');
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        res.json(cart);  // Always send the updated cart to frontend
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Add Item to Cart
const addItemToCart = async (req, res) => {
    const { userId } = req.params;
    const { productId, price, quantity, image } = req.body;

    if (isNaN(price) || price < 0 || isNaN(quantity) || quantity < 0) {
        return res.status(400).json({ message: 'Invalid price or quantity' });
    }

    try {
        let cart = await Cart.findOneAndUpdate(
            { userId, 'items.productId': { $ne: productId } },
            {
                $push: { items: { productId, price, quantity, image } },
                $inc: { totalPrice: price * quantity }
            },
            { new: true, upsert: true }
        ).populate('items.productId');  // Populate after update

        res.json(cart);  // Return updated cart to frontend
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Remove Item from Cart using $pull and $inc
const removeItemFromCart = async (req, res) => {
    const { userId, productId } = req.params;

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        const itemToRemove = cart.items.find(item => item.productId.toString() === productId);
        if (!itemToRemove) return res.status(404).json({ message: 'Item not found in cart' });

        const updatedCart = await Cart.findOneAndUpdate(
            { userId },
            {
                $pull: { items: { productId } },
                $inc: { totalPrice: -(itemToRemove.price * itemToRemove.quantity) }
            },
            { new: true }
        ).populate('items.productId');  // Populate after update

        res.json(updatedCart);  // Return updated cart to frontend
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Update Item Quantity in Cart using $set and $inc
const updateItemQuantity = async (req, res) => {
    const { userId, productId } = req.params;
    const { quantity } = req.body;

    if (isNaN(quantity) || quantity < 0) {
        return res.status(400).json({ message: 'Invalid quantity' });
    }

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        const item = cart.items.find(item => item.productId.toString() === productId);
        if (!item) return res.status(404).json({ message: 'Item not found in cart' });

        const oldQuantity = item.quantity;
        const itemPrice = item.price;

        const priceDifference = (quantity - oldQuantity) * itemPrice;

        const updatedCart = await Cart.findOneAndUpdate(
            { userId, 'items.productId': productId },
            {
                $set: { 'items.$.quantity': quantity },
                $inc: { totalPrice: priceDifference }
            },
            { new: true }
        ).populate('items.productId');  // Populate after update

        res.json(updatedCart);  // Return updated cart to frontend
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
