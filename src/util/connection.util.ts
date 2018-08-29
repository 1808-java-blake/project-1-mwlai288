import { Pool } from "pg";

export const connectionPool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: "postgres",
  password: process.env.PGPASSWORD,
  port: 5432
});
