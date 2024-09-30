import express from 'express';
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct, getFilteredProducts } from '../controllers/product.controller.js';
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Product CRUD routes
router.route('/')
    .post(verifyJWT,upload.array('images', 4), createProduct) // Handle up to 4 image uploads
    .get(verifyJWT,getAllProducts);

// Route for filtering products
router.get('/filters',verifyJWT, getFilteredProducts); 

// Routes for specific product by ID
router.route('/:id')
    .get(verifyJWT,getProductById)
    .put(verifyJWT,upload.array('images', 4), updateProduct) // Handle up to 4 image uploads
    .delete(verifyJWT,deleteProduct);

export default router;
