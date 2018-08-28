import { Pool } from 'pg';

export const connectionPool = new Pool({
	user: process.env.PGUSER,
	host: 'localhost',
	database: process.env.PGHOST,
	password: process.env.PGPASSWORD,
	port: 5432
});
