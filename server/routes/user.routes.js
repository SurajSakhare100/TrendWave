import express from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { deleteUser, getUserProfile, loginUser, registerUser, updateUserProfile } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/profile', verifyJWT, getUserProfile);

router.put('/profile', verifyJWT, updateUserProfile);

router.delete('/profile', verifyJWT, deleteUser);

export default router;
