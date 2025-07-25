import postgres from "postgres";
import 'dotenv/config';

export const sql = postgres({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: 'require'
});

export default sql;
