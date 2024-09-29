import mongoose, { Schema } from 'mongoose';

// Define the Product Schema
const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    default: '',
  },
  image_url: {
    type: String,
    default: '',
  },
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Category', // Reference to Category model
    },
  ],
  stock: {
    type: Number,
    default: 0,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt fields
});

// Create and export the Product model
const Product = mongoose.model('Product', productSchema);
export default Product;
