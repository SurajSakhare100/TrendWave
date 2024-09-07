import express from 'express';
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct, getFilteredProducts } from '../controllers/product.controller.js';

const router = express.Router();

// Routes
router.post('/products', createProduct);
router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);
router.get('/products/filters', getFilteredProducts);
export default router;
