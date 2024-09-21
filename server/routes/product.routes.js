import express from 'express';
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct, getFilteredProducts } from '../controllers/product.controller.js';
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

// Product CRUD routes
router.route('/')
    .post(upload.array('images', 4), createProduct) // Handle up to 4 image uploads
    .get(getAllProducts);

// Route for filtering products
router.get('/filters', getFilteredProducts); 

// Routes for specific product by ID
router.route('/:id')
    .get(getProductById)
    .put(upload.array('images', 4), updateProduct) // Handle up to 4 image uploads
    .delete(deleteProduct);

export default router;
