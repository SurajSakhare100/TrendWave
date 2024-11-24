import express from "express";
import Cart from "../models/cart.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
const router = express.Router();

// Get Cart by User ID
const getCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const cart = await Cart.findOne({ userId }).populate("items.productId");

  if (!cart) {
    res.status(404);
    throw new Error("Cart not found");
  }

  res.status(200).json({
    success: true,
    data: cart,
  });
});

// Add Item to Cart
const addToCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { productId, price, quantity, image, stock, isFeatured } = req.body;

  if (isNaN(price) || price < 0 || isNaN(quantity) || quantity < 0) {
    return next(new ApiError("invalid price or quantity"));
  }

  try {
    let cart = await Cart.findOneAndUpdate(
      { userId, "items.productId": { $ne: productId } },
      {
        $push: {
          items: { productId, price, quantity, image, stock, isFeatured },
        },
        $inc: { totalPrice: price * quantity },
      },
      { new: true, upsert: true }
    ).populate("items.productId"); // Populate after update

    return res
      .status(200)
      .json(new ApiResponse(200, cart, "Cart fetched successfully"));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const removeFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.params; // Item ID to remove
  const userId = req.user._id;
  const cart = await Cart.findOne({ userId });
  if (!cart) {
    res.status(404);
    throw new Error("Cart not found");
  }

  cart.items = cart.items.filter(
    (item) => item.productId.toString() !== productId
  );
  await cart.save();

  res.status(200).json({ success: true, cart });
});

// Update Item Quantity in Cart using $set and $inc
const updateItemQuantity = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  if (isNaN(quantity) || quantity < 0) {
    return res.status(400).json({ message: "Invalid quantity" });
  }

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      (item) => item.productId.toString() === productId
    );
    if (!item)
      return res.status(404).json({ message: "Item not found in cart" });

    const oldQuantity = item.quantity;
    const itemPrice = item.price;

    const priceDifference = (quantity - oldQuantity) * itemPrice;

    const updatedCart = await Cart.findOneAndUpdate(
      { userId, "items.productId": productId },
      {
        $set: { "items.$.quantity": quantity },
        $inc: { totalPrice: priceDifference },
      },
      { new: true }
    ).populate("items.productId"); // Populate after update

    res.json(updatedCart); // Return updated cart to frontend
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const clearCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const cart = await Cart.findOne({ userId });

  if (!cart) {
    res.status(404);
    throw new Error("Cart not found");
  }

  cart.items = [];
  cart.totalPrice = 0;
  await cart.save();

  res.status(200).json({ success: true, message: "Cart cleared successfully" });
});

export { getCart, addToCart, removeFromCart, updateItemQuantity, clearCart };
