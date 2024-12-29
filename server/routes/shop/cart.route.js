import express from "express";
import { 
  addToCart, 
  fetchCartItems, 
  deleteCartItem, 
  updateCartItemQty 
} from "../../controllers/shop/cart.controller.js";
import authMiddleware from "../../middleware/auth.js";

const router = express.Router();


router.post("/add",authMiddleware, addToCart);
router.get("/get/:userId",authMiddleware, fetchCartItems);
router.put("/update-cart",authMiddleware, updateCartItemQty);
router.delete("/:userId/:productId",authMiddleware, deleteCartItem);
export default router;