import { betterAuth } from "better-auth";
// Note: We would import drizzleAdapter and the schema here exactly as it was on the NextJS side.
// For now we instantiate the minimal Better Auth instance.

export const auth = betterAuth({
  database: {
    // Adapter configuration goes here.
    dialect: "postgres",
    type: "postgres",
  },
  emailAndPassword: {
    enabled: true,
  },
  baseURL: process.env.API_URL || "http://localhost:3001/api/auth",
});
