import client from '../db.js';

export const getGraph = async (req, res) => {
    try {
        const result = await client.query('SELECT date, amount FROM transactions_weekly'); // adjust columns as needed
        res.json(result.rows);
    } catch (err) {
        res.status(500).send('Database error: ' + err.message);
    }
};
