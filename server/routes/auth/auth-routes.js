import express from "express";
import { 
  registerUser, 
  loginUser, 
  logoutUser, 
  googleLogin, 
  getuser 
} from "../../controllers/auth/auth-controller.js";
import authMiddleware from "../../middleware/auth.js";

const router = express.Router();


router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout",authMiddleware, logoutUser);
router.post('/google-login', googleLogin);
router.get("/getuser", authMiddleware,getuser);

export default router;
