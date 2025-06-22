import client from '../db.js';

export const getTotalBalance = async (req, res) => {
    try {
        const result = await client.query('SELECT SUM(amount) AS total FROM transactions_weekly');
        const total = result.rows[0].total || 0;
        res.json({ total });
    } catch (err) {
        res.status(500).send('Error fetching total balance: ' + err.message);
    }
};
