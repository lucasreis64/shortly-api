import express from 'express';
import { create, signIn } from '../controllers/authController.js';
import { validateSignUp } from '../middlewares/validateSignUp.js';

const router = express.Router();

router.post("/signin", signIn);
router.post("/signup", validateSignUp, create);

export default router;
