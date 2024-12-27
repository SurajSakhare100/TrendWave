const express = require("express");

const {
  handleImageUpload,
  addProduct,
  editProduct,
  fetchAllProducts,
  deleteProduct,
} = require("../../controllers/admin/products-controller");

const { upload } = require("../../helpers/cloudinary");
const { authMiddleware } = require("../../middleware/auth");

const router = express.Router();

router.post("/upload-image",authMiddleware, upload.single("my_file"), handleImageUpload);
router.post("/add",authMiddleware. addProduct);
router.put("/edit/:id",authMiddleware, editProduct);
router.delete("/delete/:id",authMiddleware, deleteProduct);
router.get("/get",authMiddleware, fetchAllProducts);

module.exports = router;
