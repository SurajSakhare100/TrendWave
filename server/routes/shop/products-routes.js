const express = require("express");

const {
  getFilteredProducts,
  getProductDetails,
  getBestSeller,
} = require("../../controllers/shop/products-controller");

const router = express.Router();

router.get("/get", getFilteredProducts);
router.get("/get/bestSeller", getBestSeller);
router.get("/get/:id", getProductDetails);

module.exports = router;
