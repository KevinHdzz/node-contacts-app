import { createPool } from 'mysql2/promise';
import config from '../config.js';

// const pool = createPool(config.DB_URL)

const pool = createPool({
   host: config.DB_HOST,
   port: config.DB_PORT,
   user: config.DB_USER,
   password: config.DB_PASSWORD,
   database: config.DB_NAME
})

export default pool;
