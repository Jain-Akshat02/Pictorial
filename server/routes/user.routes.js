import express from 'express';
import { getUser, updateUser } from '../components/user.controller.js';
import { verifyUser } from '../middlewares/verifyUser.middleware.js';

const router = express.Router();

router.patch("/update-username/:id",verifyUser, updateUser);