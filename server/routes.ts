import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { getProducts, getProduct, getProductsByCategory } from "./woocommerce";
import { uploadImageToCloudinary, uploadImageBuffer } from "@shared/cloudinary-utils";
import multer from "multer";

export async function registerRoutes(app: Express): Promise<Server> {
  // WooCommerce Products API routes

  // Get all products (frames only, matching production)
  app.get("/api/products", async (req, res, next) => {
    try {
      console.log('[API] Fetching frames products');
      
      // Get only frames category products (matching production behavior)
      const products = await getProductsByCategory('frames');

      // Filter out progressive lenses as requested
      const filteredProducts = products.filter(p => !p.name.toLowerCase().includes("progressive"));
      
      console.log('[API] Raw frames count:', products.length);
      console.log('[API] Filtered frames count:', filteredProducts.length);

      res.json(filteredProducts);
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
  app.get("/api/categories/:categorySlug/products", async (req, res, next) => {
    try {
      const { categorySlug } = req.params;
      const products = await getProductsByCategory(categorySlug);

      // Filter out progressive lenses as requested
      const filteredProducts = products.filter(p => !p.name.toLowerCase().includes("progressive"));

      console.log(`[API] Fetching products for category: ${categorySlug}`);
      console.log(`[API] Found ${products.length} products`);
      console.log(`[API] After filtering: ${filteredProducts.length} products`);

      res.json(filteredProducts);
    } catch (error) {
      next(error);
    }
  });

  // Get trending frames (first 4 frame products)
  app.get("/api/trending-frames", async (req, res, next) => {
    try {
      const products = await getProductsByCategory("frames");

      // Filter out progressive lenses and get first 4 products
      const trendingFrames = products
        .filter(p => !p.name.toLowerCase().includes("progressive"))
        .slice(0, 4);

      console.log(`[API] Fetching trending frames`);
      console.log(`[API] Found ${trendingFrames.length} trending products`);

      res.json(trendingFrames);
    } catch (error) {
      next(error);
    }
  });

  // Cloudinary image upload endpoint
  const upload = multer({ storage: multer.memoryStorage() });
  
  app.post("/api/upload-image", upload.single('image'), async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No image file provided" });
      }

      const filename = req.file.originalname.replace(/\.[^/.]+$/, ""); // Remove extension
      const folder = (req.body.folder as string) || 'optiquelens';

      const result = await uploadImageBuffer(
        req.file.buffer,
        filename,
        folder
      );

      res.json({
        success: true,
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
        format: result.format
      });
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      next(error);
    }
  });

  // Image proxy endpoint to handle authenticated image requests
  app.get("/api/proxy-image", async (req, res, next) => {
    try {
      const imageUrl = req.query.url as string;
      
      if (!imageUrl) {
        return res.status(400).json({ message: "Image URL is required" });
      }

      // Fetch image with authentication if needed
      const fetchOptions: RequestInit = {
        headers: {
          'User-Agent': 'Mozilla/5.0',
        },
      };

      // Add basic auth if LocalWP credentials are available
      if (process.env.LOCALWP_USERNAME && process.env.LOCALWP_PASSWORD) {
        const credentials = Buffer.from(
          `${process.env.LOCALWP_USERNAME}:${process.env.LOCALWP_PASSWORD}`
        ).toString('base64');
        fetchOptions.headers = {
          ...fetchOptions.headers,
          'Authorization': `Basic ${credentials}`,
        };
      }

      const response = await fetch(imageUrl, fetchOptions);
      
      if (!response.ok) {
        return res.status(response.status).json({ message: "Failed to fetch image" });
      }

      // Get content type from response
      const contentType = response.headers.get('content-type');
      if (contentType) {
        res.setHeader('Content-Type', contentType);
      }

      // Cache for 1 hour
      res.setHeader('Cache-Control', 'public, max-age=3600');

      // Stream the image to the client
      const buffer = await response.arrayBuffer();
      res.send(Buffer.from(buffer));
    } catch (error) {
      console.error('Error proxying image:', error);
      next(error);
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}