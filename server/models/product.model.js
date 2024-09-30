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
  images: [
    {
      type: String,
      default: '',
    }
  ],
  categories: [
    {
      type: String,
      default: "t-shirts",
    },
  ],
  sizes: [
    {
      type: String,
      enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      required: true,
    }
  ],
  colors: [
    {
      type: String,
      required: true,
    }
  ],
  material: {
    type: String,
    default: '',
  },
  stock: {
    type: Number,
    default: 0,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  brand: {
    type: String,
    trim: true,
    default: '',
  },
  ratings: {
    type: Number,
    default: 0, // Average rating
  },
  numReviews: {
    type: Number,
    default: 0, // Number of reviews
  },
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt fields
});

// Create and export the Product model
const Product = mongoose.model('Product', productSchema);
export default Product;
