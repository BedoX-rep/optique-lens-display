import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Products table
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  price: integer("price").notNull(), // price in pence/cents
  originalPrice: integer("original_price"), // for discounted items
  inStock: boolean("in_stock").notNull().default(true),
  productCode: text("product_code").notNull().unique(),
  size: text("size").notNull(), // e.g., "48x19x140"
  color: text("color").notNull(),
  material: text("material").notNull(),
  description: text("description"),
  frameWidth: integer("frame_width"), // in mm
  bridgeWidth: integer("bridge_width"), // in mm  
  templeLength: integer("temple_length"), // in mm
  images: text("images").array().notNull(), // array of image URLs
  availableColors: text("available_colors").array().notNull(),
  category: text("category").notNull(), // glasses, sunglasses, etc.
  brand: text("brand"),
  isFrameOnly: boolean("is_frame_only").notNull().default(false),
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
});

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;
