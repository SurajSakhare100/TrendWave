const express = require("express");

const {
  addFeatureImage,
  getFeatureImages,
} = require("../../controllers/common/feature-controller");
const { authMiddleware } = require("../../middleware/auth");

const router = express.Router();

router.post("/add",authMiddleware, addFeatureImage);
router.get("/get",authMiddleware, getFeatureImages);

module.exports = router;
