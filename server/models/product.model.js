import mongoose, { Schema } from 'mongoose';

const RatingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
});

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
  ratings: [RatingSchema],
  averageRating: { type: Number, default: 0 },
  numReviews: {
    type: Number,
    default: 0, // Number of reviews
  },
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt fields
});

productSchema.methods.calculateAverageRating = function () {
  const total = this.ratings.reduce((acc, { rating }) => acc + rating, 0);
  this.averageRating = total / this.ratings.length;
  return this.save();
};
const Product = mongoose.model('Product', productSchema);
export default Product;
