import express from "express";
import { searchProducts } from "../../controllers/shop/search.controller.js";
import authMiddleware from "../../middleware/auth.js";

const router = express.Router();

router.get("/:keyword",authMiddleware, searchProducts);

export default router;
