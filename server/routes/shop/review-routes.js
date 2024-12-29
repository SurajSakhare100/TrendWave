import express from "express";
import { 
  addProductReview, 
  getProductReviews 
} from "../../controllers/shop/product-review-controller.js";
import authMiddleware from "../../middleware/auth.js";

const router = express.Router();


router.post("/add",authMiddleware, addProductReview);
router.get("/:productId",authMiddleware, getProductReviews);

export default router;
