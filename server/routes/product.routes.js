import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getFilteredProducts,
  saveProduct,
  removeSavedProduct,
  getSavedProducts,
  rateProduct,
} from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get('/savedProducts',verifyJWT, getSavedProducts);
router.post('/:productId/rate',verifyJWT, rateProduct);

router
  .route("/")
  .post(verifyJWT, upload.array("images", 4), createProduct) // Handle up to 4 image uploads
  .get( getAllProducts);

// Route for filtering products
router.get("/filters", getFilteredProducts);

// Routes for specific product by ID
router
  .route("/:id")
  .get(verifyJWT, getProductById)
  .put(verifyJWT, upload.array("images", 4), updateProduct) // Handle up to 4 image uploads
  .delete(verifyJWT, deleteProduct);

router.route("/save/:productId")
      .post(verifyJWT, saveProduct)
      .delete(verifyJWT, removeSavedProduct);

export default router;
