import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  user: 'myuser',
  host: '192.168.0.113',
  database: 'mydb',
  password: '0863456374',
  port: 5432,
});

export default pool; // ✅ export as default for ESM

