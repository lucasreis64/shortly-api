import pkg from 'pg';
import dotenv from 'dotenv'
dotenv.config();

const { Pool } = pkg;
export const connection = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
})
