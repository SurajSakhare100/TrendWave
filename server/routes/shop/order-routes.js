import express from "express";
import { 
  createOrder, 
  getAllOrdersByUser, 
  getOrderDetails, 
  capturePayment 
} from "../../controllers/shop/order-controller.js";
import authMiddleware from "../../middleware/auth.js";

const router = express.Router();

router.post("/create",authMiddleware, createOrder);
router.post("/capture",authMiddleware, capturePayment);
router.get("/list/:userId",authMiddleware, getAllOrdersByUser);
router.get("/details/:id",authMiddleware, getOrderDetails);
export default router;