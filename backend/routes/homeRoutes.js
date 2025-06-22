import express from 'express';
import { getBalance, addBalance } from '../controllers/homeController.js'; // ✅ changed

const router = express.Router();

router.get('/', getBalance);
router.post('/', addBalance);

export default router;
