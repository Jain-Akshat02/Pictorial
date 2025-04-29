import express from 'express';
import { signupValidation, loginValidation } from '../middlewares/AuthValidation.middleware.js';
import { registerUser, loginUser } from '../components/user.controller.js';
const router = express.Router();

//complete url - http://localhost:5000/auth/{login, register}
router.post('/login', loginValidation, loginUser);

router.post('/register', signupValidation, registerUser);

export default router;

