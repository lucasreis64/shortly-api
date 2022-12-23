import express from 'express';
import { findMe } from '../controllers/usersController.js';
import { validateToken } from '../middlewares/validateToken.js';


const router = express.Router();

router.get("/users/me", validateToken, findMe);


export default router;
