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
// Get  products by category
export const getFilteredProducts = async (req, res) => {
  try {
    const { category, subcategory, priceRange, size } = req.query;
    console.log({ category, subcategory, priceRange, size })

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

    // Fetch filtered products
    const products = await Product.find(filter);

    res.json(products);
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
