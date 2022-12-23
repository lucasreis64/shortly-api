import express from 'express';
import { rank } from '../controllers/rankingController.js';

const router = express.Router();

router.get("/ranking", rank);


export default router;
