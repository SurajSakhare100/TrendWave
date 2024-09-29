import Product from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudnary.js";

// Create a new product with multiple image uploads
const createProduct = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    
    // Handle multiple image uploads
    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map(file => uploadOnCloudinary(file.path));
      const results = await Promise.all(uploadPromises);
      imageUrls = results.map(result => result.secure_url);
    }

    // Create product with uploaded image URLs
    const product = await Product.create({
      name,
      description,
      price,
      category,
      subCategory,
      tags,
      images: imageUrls, // Store an array of image URLs
    });

    return res.status(201).json(new ApiResponse(201, products,'Product created successfully'));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
});

// Get all products
const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json(new ApiResponse(200, products,'Products fetched successfully'));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
});

// Get filtered products with pagination
const getFilteredProducts = asyncHandler(async (req, res) => {
  const { category, tags, minPrice, maxPrice, subcategory, sizes, page = 1, limit = 12 } = req.query;
  
  const pageNumber = parseInt(page, 10);
  const pageLimit = parseInt(limit, 10);

  try {
    const filter = {};
    if (category) filter.category = category;
    if (subcategory) filter.subCategory = subcategory;
    if (sizes) filter.sizes = sizes;
    if (tags) filter.tags = { $in: tags.split(',') };
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    const products = await Product.find(filter)
      .skip((pageNumber - 1) * pageLimit)
      .limit(pageLimit);
    const totalProducts = await Product.countDocuments(filter);

    res.status(200).json({
      products,
      pagination: {
        totalProducts,
        totalPages: Math.ceil(totalProducts / pageLimit),
        currentPage: pageNumber,
        perPage: pageLimit
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single product by ID
const getProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    console.log(product)
    if (!product) return res.status(404).json(new ApiResponse(404, 'Product not found'));
    return res.status(200).json(new ApiResponse(200, product,'Product fetched successfully', ));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
});

// Update a product with optional new images
const updateProduct = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, tags ,sizes} = req.body;
    let product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json(new ApiResponse(404, 'Product not found'));

    let imageUrls = product.images || [];
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map(file => uploadOnCloudinary(file.path));
      const results = await Promise.all(uploadPromises);
      imageUrls = imageUrls.concat(results.map(result => result.secure_url));
    }

    product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, category, tags, images: imageUrls,sizes },
      { new: true }
    );

    return res.status(200).json(new ApiResponse(200,product, 'Product updated successfully' ));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
});

// Delete a product
const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json(new ApiResponse(404, 'Product not found'));

    await product.remove();
    return res.status(200).json(new ApiResponse(200, 'Product deleted successfully', product));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
});


export {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getFilteredProducts
};
