import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createWooCommerceApi, normalizeProduct } from "../../../shared/woocommerce-utils.js";
import type { WooCommerceProduct } from "../../../shared/woocommerce-types.js";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  console.log('[API] /api/categories/[categorySlug]/products - Request received');
  console.log('[API] Query params:', req.query);
  console.log('[API] Method:', req.method);
  
  const api = createWooCommerceApi();
  
  if (!api) {
    console.error('[API] WooCommerce API not configured');
    return res.status(500).json({ 
      error: "WooCommerce API not configured",
      message: "Missing environment variables: WOOCOMMERCE_URL, WOOCOMMERCE_CONSUMER_KEY, or WOOCOMMERCE_CONSUMER_SECRET"
    });
  }

  try {
    const { categorySlug } = req.query;
    console.log('[API] Category slug:', categorySlug);
    
    if (!categorySlug || typeof categorySlug !== 'string') {
      console.error('[API] Invalid category slug');
      return res.status(400).json({ error: "Invalid category slug" });
    }

    console.log('[API] Fetching category data for slug:', categorySlug);
    const categoriesResponse = await api.get("products/categories", {
      slug: categorySlug,
    });

    console.log('[API] Category response:', categoriesResponse.data);

    if (categoriesResponse.data.length === 0) {
      console.log('[API] No category found, returning empty array');
      return res.status(200).json([]);
    }

    const categoryId = categoriesResponse.data[0].id;
    console.log('[API] Category ID:', categoryId);

    console.log('[API] Fetching products for category ID:', categoryId);
    const response = await api.get("products", {
      category: categoryId,
      per_page: 100,
      status: "publish",
    });

    const wcProducts = response.data as WooCommerceProduct[];
    console.log('[API] Raw products count:', wcProducts.length);
    
    const products = await Promise.all(
      wcProducts.map((wcProduct) => normalizeProduct(wcProduct, api))
    );

    const filteredProducts = products.filter(p => !p.name.toLowerCase().includes("progressive"));
    console.log('[API] Filtered products count:', filteredProducts.length);

    res.status(200).json(filteredProducts);
  } catch (error) {
    console.error("[API] Error fetching products by category:", error);
    console.error("[API] Error details:", JSON.stringify(error, null, 2));
    res.status(500).json({ 
      error: "Failed to fetch products by category",
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
