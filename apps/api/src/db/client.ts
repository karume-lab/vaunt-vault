import * as schema from "@api/db/schema";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const connectionString =
  process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/db";
const queryClient = postgres(connectionString);
export const db = drizzle(queryClient, { schema });
