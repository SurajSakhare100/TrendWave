import mongoose, { Schema } from 'mongoose';

// Define the Category Schema
const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Ensure each category name is unique
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    default: '',
  },
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt fields
});

// Create and export the Category model
const Category = mongoose.model('Category', categorySchema);
export default Category;
