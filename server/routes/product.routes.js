import express from 'express';
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct, getFilteredProducts } from '../controllers/product.controller.js';
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

// Product CRUD routes
router.route('/')
    .post(upload.single('image'), createProduct) // Image upload middleware
    .get(getAllProducts);


router.get('/filters', getFilteredProducts);  // Place this route before the dynamic :id route

router.route('/:id')
    .get(getProductById)
    .put(upload.single('image'), updateProduct)
    .delete(deleteProduct);
export default router;
