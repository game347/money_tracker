import client from '../db.js';

export const getBalance = async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM transactions_weekly'); // change if needed
        res.json(result.rows);
    } catch (err) {
        res.status(500).send('Database error: ' + err.message);
    }
};
