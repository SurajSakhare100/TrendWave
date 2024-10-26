import express from 'express';
import { upload } from "../middlewares/multer.middleware.js";
import { changeCurrentPassword, getAllUser, getCurrentUser, getUserById, googleLogin, loginUser, logoutUser, registerUser } from '../controllers/auth.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/registeruser', registerUser);
router.post('/loginuser', loginUser);  // No JWT verification needed for login
router.post('/logout', verifyJWT, logoutUser);
router.post('/updatepassword', verifyJWT, changeCurrentPassword);
router.get('/getuser', verifyJWT, getCurrentUser);  // JWT verification needed
router.get('/getuser/:id', verifyJWT, getUserById);
router.get('/getalluser', verifyJWT, getAllUser);
router.post('/google-login', googleLogin);

export default router;
