const express = require("express");

const {
  getAllOrdersOfAllUsers,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} = require("../../controllers/admin/order-controller");
const { authMiddleware } = require("../../middleware/auth");

const router = express.Router();

router.get("/get",authMiddleware, getAllOrdersOfAllUsers);
router.get("/details/:id",authMiddleware, getOrderDetailsForAdmin);
router.put("/update/:id",authMiddleware, updateOrderStatus);

module.exports = router;
