import express from "express";
import { 
  addFeatureImage, 
  getFeatureImages 
} from "../../controllers/shop/feature.controller.js";
import authMiddleware from "../../middleware/auth.js";

const router = express.Router();


router.post("/add",authMiddleware, addFeatureImage);
router.get("/get",authMiddleware, getFeatureImages);

export default router;
