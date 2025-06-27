import client from '../db.js';

export const getBalance = async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM transactions');
        res.json(result.rows);
    } catch (err) {
        res.status(500).send('Database error: ' + err.message);
    }
};

export const addBalance = async (req, res) => {
    const { amount, note, date } = req.body;
    try {
        await client.query(
            'INSERT INTO transactions (amount, note, date) VALUES ($1, $2, $3)',
            [amount, note, date]
        );
        res.status(201).send('Transaction recorded.');
    } catch (err) {
        res.status(500).send('Database insert error: ' + err.message);
    }
};

// Make sure this function exists and is exported
export const getTotalBalance = async (req, res) => {
    try {
        const result = await client.query('SELECT SUM(amount) AS total FROM transactions');
        const total = result.rows[0].total || 0;
        res.json({ total });
    } catch (err) {
        res.status(500).send('Error fetching total balance: ' + err.message);
    }
};
