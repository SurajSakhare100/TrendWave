import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import Category from '../models/category.model.js';

// Create a new category
export const createCategory = async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    throw new ApiError(400, 'Category name is required');
  }

  const newCategory = new Category({ name, description });
  await newCategory.save();
  
  return res.status(201).json(new ApiResponse(201, newCategory, 'Category created successfully'));
};

export const getCategories = async (req, res) => {
    const categories = await Category.find();
    
    return res.status(200).json(new ApiResponse(200, categories, 'Categories fetched successfully'));
  };
  