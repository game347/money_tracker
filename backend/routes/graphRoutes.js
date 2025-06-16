import express from 'express';
import { getGraph } from '../controllers/graphController.js';

const router = express.Router();

router.get('/', getGraph); // GET http://localhost:5000/graph

export default router;
