// models/Wishlist.js
import mongoose  from 'mongoose';

const wishlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

export const Wishlist = mongoose.model('Wishlist', wishlistSchema);
