import express from 'express';
import homeRoutes from './routes/homeRoutes.js';
import balanceRoutes from './routes/balanceRoutes.js';
import graphRoutes from './routes/graphRoutes.js';

const app = express();

// Middleware to parse JSON in request body
app.use(express.json());

// Route handling
app.use('/', homeRoutes);             // Homepage and basic routes
app.use('/balance', balanceRoutes);  // Balance insert/get routes
app.use('/graph', graphRoutes);      // Routes for graphs

// Start server
app.listen(5000, () => {
    console.log('✅ Server is running on port 5000');
});

