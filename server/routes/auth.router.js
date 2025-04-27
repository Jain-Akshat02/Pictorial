import express from 'express';
import { signupValidation, loginValidation } from '../middlewares/AuthValidation.middleware.js';
import { registerUser, loginUser } from '../components/user.controller.js';
const router = express.Router();

router.post('/login', loginValidation, loginUser);

router.post('/register', signupValidation, registerUser);

export default router;

