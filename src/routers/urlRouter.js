import express from 'express';
import { create, deleteOne, findOne, redirect } from '../controllers/urlsController.js';
import { validateToken } from '../middlewares/validateToken.js';
import { validateUrl } from '../middlewares/validateUrl.js';

const router = express.Router();

router.post("/urls/shorten", validateToken, validateUrl, create);
router.get("/urls/:id", findOne);
router.get("/urls/open/:shortUrl", redirect);
router.delete("/urls/:id", validateToken, deleteOne);
router.delete("/users/me", validateToken, deleteOne);


export default router;
