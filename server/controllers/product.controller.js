
// @desc    Create a new product with image upload to Cloudinary
// @route   POST /api/v1/products

import Product from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudnary.js";

const createProduct = asyncHandler(async(req, res) => {
  try {
      const { name, description, price, category, tags } = req.body;

      // Handle image upload
      let imageUrl = '';
      if (req.file) {
          const result = await uploadOnCloudinary(req.file.path);
          imageUrl = result.secure_url; // Image URL after uploading to Cloudinary
      }

      // Create product with uploaded image URL
      const product = await Product.create({
          name,
          description,
          price,
          category,
          tags,
          image: imageUrl,
      })
      const newProduct =await product.save();
      console.log(newProduct)
      return res
      .status(201)
      .json( new ApiResponse( 201, 'Product created successfully', newProduct));
     
  } catch (error) {
      console.error(error);
      // throw new ApiError(
      //   500,
      //   "Something went wrong while registering the user"
      // );
  }
}) 

const getAllProducts = asyncHandler(async (req, res) => {
  try {
      const products = await Product.find();
      return res
      .status(201)
      .json( new ApiResponse( 201, 'Products get successfully', products));
  } catch (error) {
      console.error(error);
      // ApiResponse(res, 500, 'Server error while fetching products');
  }
})
const getFilteredProducts = async (req, res) => {
    const { category, tags, minPrice, maxPrice, subcategory, sizes, page = 1, limit = 12 } = req.query;
    
    // Convert page and limit to integers
    const pageNumber = parseInt(page, 10);
    const pageLimit = parseInt(limit, 10);
    try {
        // Build the filter object
        const filter = {};
        if (category) {
            filter.category = category;
        }
        if (subcategory) {
            filter.subCategory = subcategory;
        }
        if (sizes) {
            filter.sizes = sizes;
        }
        if (tags) {
            filter.tags = { $in: tags.split(',') }; // Tags should be a comma-separated string
        }
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) {
                filter.price.$gte = parseFloat(minPrice);
            }
            if (maxPrice) {
                filter.price.$lte = parseFloat(maxPrice);
            }
        }

        // Fetch products based on filters with pagination
        const products = await Product.find(filter)
            .skip((pageNumber - 1) * pageLimit)
            .limit(pageLimit);
        // Count total number of products matching the filters for pagination info
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
};


// @desc    Get a single product by ID
// @route   GET /api/v1/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  try {
      const product = await Product.findById(req.params.id);
      if (!product) return ApiResponse(res, 404, 'Product not found');
      return res
      .status(201)
      .json( new ApiResponse( 201,product, 'Products get successfully'));
  } catch (error) {
      console.error(error);
      // ApiResponse(res, 500, 'Server error while fetching product');
  }
}
)
// @desc    Update product
// @route   PUT /api/v1/products/:id
// @access  Public/Admin
const updateProduct = asyncHandler(async (req, res) => {
  try {
      const { name, description, price, category, tags } = req.body;
      let product = await Product.findById(req.params.id);
      if (!product) return ApiResponse(res, 404, 'Product not found');

      // Handle image upload if a new image is provided
      if (req.file) {
          const result = await cloudinary.uploader.upload(req.file.path);
          req.body.image = result.secure_url;
      }

      // Update product fields
      product = await Product.findByIdAndUpdate(
          req.params.id,
          { name, description, price, category, tags, image: req.body.image || product.image },
          { new: true }
      );
      return res
      .status(201)
      .json( new ApiResponse( 201, 'Product updated successfully', product));
  } catch (error) {
      console.error(error);
      // ApiResponse(res, 500, 'Server error while updating product');
  }
})

// @desc    Delete product
// @route   DELETE /api/v1/products/:id
// @access  Public/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  try {
      const product = await Product.findById(req.params.id);
      if (!product) return ApiResponse(res, 404, 'Product not found');

      await product.remove();
      return res
      .status(201)
      .json( new ApiResponse( 201, 'Product deleted successfully', product));
  } catch (error) {
      console.error(error);
      // ApiResponse(res, 500, 'Server error while deleting product');
  }
}
)
export {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getFilteredProducts
};
