const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  googleLogin,
} = require("../../controllers/auth/auth-controller");
const { authMiddleware } = require("../../middleware/auth");

const router = express.Router();

router.post("/register",authMiddleware, registerUser);
router.post("/login", loginUser);
router.post("/logout",authMiddleware, logoutUser);
router.post('/google-login', googleLogin);
router.get("/check-auth", authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authenticated user!",
    user,
  });
});

module.exports = router;
