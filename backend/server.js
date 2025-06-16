import express from 'express';
import homeRoutes from './routes/homeRoutes.js';
import balanceRoutes from './routes/balanceRoutes.js';
import graphRoutes from './routes/graphRoutes.js';

const app = express();
app.use(express.json());

app.use('/', homeRoutes);        // For homepage requests
app.use('/balance', balanceRoutes); // For balance-related data
app.use('/graph', graphRoutes);     // For graph/chart-related data

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
