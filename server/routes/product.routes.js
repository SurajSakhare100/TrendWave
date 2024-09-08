import express from 'express';
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct, getFilteredProducts } from '../controllers/product.controller.js';

const router = express.Router();

// Routes
router.post('/products', createProduct);
router.get('/products/filters', getFilteredProducts);  // Place this route before the dynamic :id route
router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;
