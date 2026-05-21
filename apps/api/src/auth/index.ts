import { betterAuth } from "better-auth";
import { Pool } from "pg";

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.DATABASE_URL || "postgres://postgres:password@localhost:5432/postgres",
  }),
  emailAndPassword: {
    enabled: true,
  },
  baseURL: process.env.API_URL || "http://localhost:8000/api/auth",
});
