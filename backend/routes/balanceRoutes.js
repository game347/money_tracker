import express from 'express';
import { getBalance, addBalance, getTotalBalance } from '../controllers/homeController.js'; // or balanceController.js

const router = express.Router();

router.get('/', getBalance);           // GET /balance
router.post('/', addBalance);          // POST /balance
router.get('/total', getTotalBalance); // ✅ GET /balance/total

export default router;
