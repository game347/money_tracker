import express from 'express';
import { getBalance } from '../controllers/balanceController.js';

const router = express.Router();

router.get('/', getBalance); // GET http://localhost:5000/balance

export default router;
