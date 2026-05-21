import { createInsertSchema } from "drizzle-typebox";
import { Elysia } from "elysia";
import { db } from "@/db/client";
import { products } from "@/db/schema";

// Derived cleanly from the Drizzle schema to match the Insert model perfectly
const insertProductSchema = createInsertSchema(products);

export const productsRouter = new Elysia({ prefix: "/products" })
  .get("/", async () => {
    // This will return an array of ProductWithVariants
    const results = await db.query.products.findMany({
      with: {
        variants: true,
      },
    });
    return results;
  })
  .post(
    "/",
    async ({ body }) => {
      const newProduct = await db.insert(products).values(body).returning();
      return newProduct[0];
    },
    {
      body: insertProductSchema,
      detail: {
        summary: "Create a new product",
      },
    },
  );
