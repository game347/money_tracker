import express from 'express';
import { getHome } from '../controllers/homeController.js';

const router = express.Router();

router.get('/', getHome); // GET http://localhost:5000/

export default router;
