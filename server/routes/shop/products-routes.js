import express from "express";
import { 
  getFilteredProducts, 
  getProductDetails, 
  getBestSeller 
} from "../../controllers/shop/products-controller.js";
import authMiddleware from "../../middleware/auth.js";

const router = express.Router();

router.get("/get",authMiddleware, getFilteredProducts);
router.get("/get/bestSeller",authMiddleware, getBestSeller);
router.get("/get/:id",authMiddleware, getProductDetails);
export default router;