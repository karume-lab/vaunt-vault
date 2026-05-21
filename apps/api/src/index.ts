import { cors } from "@elysiajs/cors";
import { Elysia, t } from "elysia";
import { auth } from "./auth";

import { productsRouter } from "./routes/products";
const adminRouter = new Elysia({ prefix: "/admin" })
  .get("/metrics", () => "Admin metrics");

const cartRouter = new Elysia({ prefix: "/cart" })
  .get("/", () => "Cart details")
  .post("/add", ({ body }) => body, {
    body: t.Object({ productId: t.String(), quantity: t.Number() })
  });

const checkoutRouter = new Elysia({ prefix: "/checkout" })
  .post("/", () => "Checkout logic");

const contactRouter = new Elysia({ prefix: "/contact" })
  .post("/", ({ body }) => body, {
    body: t.Object({ email: t.String(), message: t.String() })
  });

export const app = new Elysia({ prefix: "/api" })
  .use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:3000" }))
  .all("/auth/*", ({ request }) => auth.handler(request))
  .use(productsRouter)
  .use(adminRouter)
  .use(cartRouter)
  .use(checkoutRouter)
  .use(contactRouter)
  .listen(process.env.PORT || 8000);

console.log(`🦊 Elysia API is running at ${app.server?.hostname}:${app.server?.port}`);

export type App = typeof app;
