import express from 'express';
import cors from 'cors';

import homeRoutes from './routes/homeRoutes.js';
import balanceRoutes from './routes/balanceRoutes.js';
import graphRoutes from './routes/graphRoutes.js';

const app = express(); // ✅ Define app first

app.use(cors()); // ✅ Then use cors after app is defined
app.use(express.json());

// Route handling
app.use('/', homeRoutes);
app.use('/balance', balanceRoutes);
app.use('/graph', graphRoutes);

// Start server
app.listen(5000, () => {
    console.log('✅ Server is running on port 5000');
});
