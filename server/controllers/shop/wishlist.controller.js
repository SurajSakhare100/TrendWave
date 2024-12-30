// routes/wishlistRoutes.js
import express from 'express';
import { Wishlist } from '../../models/Wishlist.model.js';


// Add product to wishlist
const addWishlist= async (req, res) => {
  const { userId, productId } = req.body;
  try {
    let wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      wishlist = new Wishlist({ userId, products: [productId] });
    } else if (!wishlist.products.includes(productId)) {
      wishlist.products.push(productId);
    }
    await wishlist.save();
    res.status(200).json({ success: true, wishlist });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Remove product from wishlist
const removeWishlist=  async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const wishlist = await Wishlist.findOne({ userId });
    if (wishlist) {
      wishlist.products = wishlist.products.filter(
        (id) => id.toString() !== productId
      );
      await wishlist.save();
    }
    res.status(200).json({ success: true, wishlist });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get user's wishlist
const getWishlist= async (req, res) => {
  const { userId } = req.params;
  try {
    const wishlist = await Wishlist.findOne({ userId }).populate('products');
    res.status(200).json({ success: true, wishlist });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export {
    addWishlist,
    removeWishlist,
    getWishlist
}