import pg from 'pg';
import { env } from './env';

const { Pool } = pg;

const localConfig = {
  host: 'localhost',
  user: 'postgres',
  database: 'database',
  password: 'password',
  port: 5432
}

export const pool = new Pool(env.DATABASE_URL ? { connectionString: env.DATABASE_URL } : localConfig);

export const query = async (text: string, params: any[]) => {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log('executed query', { text, duration, rows: res.rowCount });
  return res;
}
