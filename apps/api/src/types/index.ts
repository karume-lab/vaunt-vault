import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import type {
  analyticsLogs,
  cartItems,
  cartSessions,
  categories,
  products,
  productVariants,
} from "@api/db/schema";

// Select Models
export type Category = InferSelectModel<typeof categories>;
export type Product = InferSelectModel<typeof products>;
export type ProductVariant = InferSelectModel<typeof productVariants>;
export type AnalyticsLog = InferSelectModel<typeof analyticsLogs>;
export type CartSession = InferSelectModel<typeof cartSessions>;
export type CartItem = InferSelectModel<typeof cartItems>;

// Insert Models
export type InsertCategory = InferInsertModel<typeof categories>;
export type InsertProduct = InferInsertModel<typeof products>;
export type InsertProductVariant = InferInsertModel<typeof productVariants>;
export type InsertAnalyticsLog = InferInsertModel<typeof analyticsLogs>;
export type InsertCartSession = InferInsertModel<typeof cartSessions>;
export type InsertCartItem = InferInsertModel<typeof cartItems>;

// Composite Types
export type ProductWithVariants = Product & {
  variants: ProductVariant[];
};

export type CartItemWithVariant = CartItem & {
  variant: ProductVariant & {
    product: Product;
  };
};

export type CartWithItems = CartSession & {
  items: CartItemWithVariant[];
};
