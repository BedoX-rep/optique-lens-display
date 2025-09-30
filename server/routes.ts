import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { getProducts, getProduct, getProductsByCategory } from "./woocommerce";

export async function registerRoutes(app: Express): Promise<Server> {
  // WooCommerce Products API routes
  
  // Get all products or products by category
  app.get("/api/products", async (req, res, next) => {
    try {
      const categorySlug = req.query.category as string | undefined;
      
      let products;
      if (categorySlug) {
        products = await getProductsByCategory(categorySlug);
      } else {
        products = await getProducts();
      }

      // Filter out progressive lenses as requested
      products = products.filter(p => !p.name.toLowerCase().includes("progressive"));

      res.json(products);
    } catch (error) {
      next(error);
    }
  });

  // Get single product by ID or slug
  app.get("/api/products/:idOrSlug", async (req, res, next) => {
    try {
      const { idOrSlug } = req.params;
      const product = await getProduct(idOrSlug);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json(product);
    } catch (error) {
      next(error);
    }
  });

  // Get products by category
  app.get("/api/categories/:slug/products", async (req, res, next) => {
    try {
      console.log(`[API] Fetching products for category: ${req.params.slug}`);
      const { slug } = req.params;
      const products = await getProductsByCategory(slug);

      console.log(`[API] Found ${products.length} products`);

      // Filter out progressive lenses as requested
      const filteredProducts = products.filter(p => !p.name.toLowerCase().includes("progressive"));

      console.log(`[API] After filtering: ${filteredProducts.length} products`);
      res.json(filteredProducts);
    } catch (error) {
      console.error(`[API] Error fetching products:`, error);
      next(error);
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
