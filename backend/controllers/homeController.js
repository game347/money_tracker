import client from '../db.js';

export const getBalance = async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM transactions_weekly');
        res.json(result.rows);
    } catch (err) {
        res.status(500).send('Database error: ' + err.message);
    }
};

export const addBalance = async (req, res) => {
    const { amount, note, date } = req.body;
    try {
        await client.query(
            'INSERT INTO transactions_weekly (amount, note, date) VALUES ($1, $2, $3)',
            [amount, note, date]
        );
        res.status(201).send('Transaction recorded.');
    } catch (err) {
        res.status(500).send('Database insert error: ' + err.message);
    }
};