import express from "express";
import authMiddleware from "../../middleware/auth.js";
import { addWishlist, getWishlist, removeWishlist } from "../../controllers/shop/wishlist.controller.js";

const router = express.Router();

router.post("/add",authMiddleware, addWishlist);
router.post("/remove",authMiddleware, removeWishlist);
router.get("/:userId",authMiddleware, getWishlist);

export default router;
