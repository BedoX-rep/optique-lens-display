import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createWooCommerceApi, normalizeProduct } from "../../../shared/woocommerce-utils";
import type { WooCommerceProduct } from "../../../shared/woocommerce-types";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  const api = createWooCommerceApi();
  
  if (!api) {
    return res.status(500).json({ 
      error: "WooCommerce API not configured",
      message: "Missing environment variables: WOOCOMMERCE_URL, WOOCOMMERCE_CONSUMER_KEY, or WOOCOMMERCE_CONSUMER_SECRET"
    });
  }

  try {
    const { categorySlug } = req.query;
    
    if (!categorySlug || typeof categorySlug !== 'string') {
      return res.status(400).json({ error: "Invalid category slug" });
    }

    const categoriesResponse = await api.get("products/categories", {
      slug: categorySlug,
    });

    if (categoriesResponse.data.length === 0) {
      return res.status(200).json([]);
    }

    const categoryId = categoriesResponse.data[0].id;

    const response = await api.get("products", {
      category: categoryId,
      per_page: 100,
      status: "publish",
    });

    const wcProducts = response.data as WooCommerceProduct[];
    const products = await Promise.all(
      wcProducts.map((wcProduct) => normalizeProduct(wcProduct, api))
    );

    const filteredProducts = products.filter(p => !p.name.toLowerCase().includes("progressive"));

    res.status(200).json(filteredProducts);
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res.status(500).json({ error: "Failed to fetch products by category" });
  }
}
