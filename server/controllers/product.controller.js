import Product from '../models/product.model.js';

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getFilteredProducts = async (req, res) => {
  try {
    const { category, subcategory, priceRange, size, limit = 12, page = 1 } = req.query;

    // Build the filter object
    const filter = {};
    if (category) filter.category = category;
    if (subcategory) filter.subCategory = subcategory;
    if (size) filter.sizes = size;

    // Price range filter
    if (priceRange) {
      const [minPrice, maxPrice] = priceRange.split('-').map(Number);
      filter.price = {};
      if (!isNaN(minPrice)) filter.price.$gte = minPrice;
      if (!isNaN(maxPrice)) filter.price.$lte = maxPrice;
    }

    // Pagination options
    const limitValue = parseInt(limit, 10) || 12; // Default to 12 if limit is not provided
    const pageValue = parseInt(page, 10) || 1; // Default to 1 if page is not provided
    const skipValue = (pageValue - 1) * limitValue;

    // Count the total number of products matching the filter
    const totalProducts = await Product.countDocuments(filter);

    // Fetch the filtered products with pagination
    const products = await Product.find(filter)
      .limit(limitValue)
      .skip(skipValue);

    // Calculate total pages
    const totalPages = Math.ceil(totalProducts / limitValue);

    // Return the products and additional info
    res.json({
      success: true,
      total: totalProducts,
      page: pageValue,
      totalPages,
      products,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};



// Get a product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a product by ID
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a product by ID
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
