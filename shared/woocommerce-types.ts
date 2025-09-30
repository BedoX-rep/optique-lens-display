import { z } from "zod";

// WooCommerce Product Types
export interface WooCommerceImage {
  id: number;
  src: string;
  name: string;
  alt: string;
}

export interface WooCommerceAttribute {
  id: number;
  name: string;
  position: number;
  visible: boolean;
  variation: boolean;
  options: string[];
}

export interface WooCommerceVariation {
  id: number;
  price: string;
  regular_price: string;
  sale_price: string;
  attributes: Array<{
    id: number;
    name: string;
    option: string;
  }>;
  image?: WooCommerceImage;
  stock_status: string;
  in_stock: boolean;
}

export interface WooCommerceProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  price: string;
  regular_price: string;
  sale_price: string;
  description: string;
  short_description: string;
  sku: string;
  stock_status: string;
  categories: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  images: WooCommerceImage[];
  attributes: WooCommerceAttribute[];
  variations?: number[];
}

// Frontend Product Types (normalized from WooCommerce)
export const productSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  price: z.number(), // in cents
  regularPrice: z.number().optional(),
  salePrice: z.number().optional(),
  description: z.string(),
  shortDescription: z.string(),
  sku: z.string(),
  inStock: z.boolean(),
  category: z.string(),
  categorySlug: z.string(),
  images: z.array(z.object({
    id: z.number(),
    src: z.string(),
    alt: z.string(),
  })),
  attributes: z.record(z.array(z.string())),
  variations: z.array(z.object({
    id: z.number(),
    price: z.number(),
    attributes: z.record(z.string()),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }).optional(),
    inStock: z.boolean(),
  })).optional(),
});

export type Product = z.infer<typeof productSchema>;

// Filter types
export const filterSchema = z.object({
  category: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  attributes: z.record(z.array(z.string())).optional(),
});

export type ProductFilters = z.infer<typeof filterSchema>;
