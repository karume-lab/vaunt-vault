import type { App } from "@api";
import { treaty } from "@elysiajs/eden";

// Instantiate Eden Treaty client pointing to our standalone Elysia backend
export const api = treaty<App>(
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
);
