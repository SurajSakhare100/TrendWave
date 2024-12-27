const express = require("express");

const {
  getFilteredProducts,
  getProductDetails,
  getBestSeller,
} = require("../../controllers/shop/products-controller");
const { authMiddleware } = require("../../middleware/auth");

const router = express.Router();

router.get("/get",authMiddleware, getFilteredProducts);
router.get("/get/bestSeller",authMiddleware, getBestSeller);
router.get("/get/:id",authMiddleware, getProductDetails);

module.exports = router;
