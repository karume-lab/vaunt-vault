import { relations } from "drizzle-orm";
import {
  bigserial,
  boolean,
  decimal,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name").unique().notNull(),
  slug: varchar("slug").unique().notNull(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export const products = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  categoryId: uuid("category_id").references(() => categories.id, {
    onDelete: "cascade",
  }),
  title: varchar("title").notNull(),
  description: text("description"),
  basePrice: decimal("base_price", { precision: 10, scale: 2 }).notNull(),
  isDigital: boolean("is_digital").default(false),
  digitalFileKey: varchar("digital_file_key"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  variants: many(productVariants),
}));

export const productVariants = pgTable("product_variants", {
  id: uuid("id").primaryKey().defaultRandom(),
  productId: uuid("product_id").references(() => products.id, {
    onDelete: "cascade",
  }),
  color: varchar("color"),
  size: varchar("size"),
  stockQty: integer("stock_qty").default(0),
  imageUrl: varchar("image_url", { length: 550 }),
});

export const productVariantsRelations = relations(
  productVariants,
  ({ one, many }) => ({
    product: one(products, {
      fields: [productVariants.productId],
      references: [products.id],
    }),
    cartItems: many(cartItems),
  }),
);

export const analyticsLogs = pgTable("analytics_logs", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  sessionId: varchar("session_id").notNull(),
  path: varchar("path").notNull(),
  referrer: varchar("referrer"),
  geoCountry: varchar("geo_country", { length: 10 }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const cartSessions = pgTable("cart_sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email"),
  status: varchar("status", {
    enum: ["active", "checkout_initiated", "purchased", "abandoned"],
  }).default("active"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const cartSessionsRelations = relations(cartSessions, ({ many }) => ({
  items: many(cartItems),
}));

export const cartItems = pgTable("cart_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  cartSessionId: uuid("cart_session_id").references(() => cartSessions.id, {
    onDelete: "cascade",
  }),
  variantId: uuid("variant_id").references(() => productVariants.id, {
    onDelete: "cascade",
  }),
  quantity: integer("quantity").default(1),
});

export const cartItemsRelations = relations(cartItems, ({ one }) => ({
  cartSession: one(cartSessions, {
    fields: [cartItems.cartSessionId],
    references: [cartSessions.id],
  }),
  variant: one(productVariants, {
    fields: [cartItems.variantId],
    references: [productVariants.id],
  }),
}));
