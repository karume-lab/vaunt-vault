import { db } from "@api/db/client";
import { products } from "@api/db/schema";
import type { InsertProduct, ProductWithVariants } from "@api/types";
import { createInsertSchema } from "drizzle-typebox";
import { Elysia } from "elysia";

// Derived cleanly from the Drizzle schema to match the Insert model perfectly
const insertProductSchema = createInsertSchema(products);

export const productsRouter = new Elysia({ prefix: "/products" })
  .get("/", async (): Promise<ProductWithVariants[]> => {
    // This will return an array of ProductWithVariants
    const results = await db.query.products.findMany({
      with: {
        variants: true,
      },
    });
    return results as unknown as ProductWithVariants[];
  })
  .post(
    "/",
    async ({ body }) => {
      const productBody = body as InsertProduct;
      const newProduct = await db
        .insert(products)
        .values(productBody)
        .returning();
      return newProduct[0];
    },
    {
      body: insertProductSchema,
      detail: {
        summary: "Create a new product",
      },
    },
  );
