const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  googleLogin,
  getuser,
} = require("../../controllers/auth/auth-controller");
const { authMiddleware } = require("../../middleware/auth");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout",authMiddleware, logoutUser);
router.post('/google-login', googleLogin);
router.get("/getuser", authMiddleware,getuser);

module.exports = router;
