import { Client } from 'pg';

const client = new Client({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: 'game0863456374', // 👈 change this
    database: 'postgres'
});

client.connect();
export default client;
