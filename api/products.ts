
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createWooCommerceApi, normalizeProduct } from "../shared/woocommerce-utils.js";
import type { WooCommerceProduct } from "../shared/woocommerce-types.js";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  console.log('[API] /api/products - Request received');
  
  const api = createWooCommerceApi();
  
  if (!api) {
    console.error('[API] WooCommerce API not configured');
    return res.status(500).json({ 
      error: "WooCommerce API not configured",
      message: "Missing environment variables: WOOCOMMERCE_URL, WOOCOMMERCE_CONSUMER_KEY, or WOOCOMMERCE_CONSUMER_SECRET"
    });
  }

  try {
    console.log('[API] Fetching frames products');
    
    // Get the frames category
    const categoriesResponse = await api.get("products/categories", {
      slug: "frames",
    });

    let categoryId;
    if (categoriesResponse.data.length > 0) {
      categoryId = categoriesResponse.data[0].id;
    }

    // Fetch only frames products
    const response = await api.get("products", {
      ...(categoryId && { category: categoryId }),
      per_page: 100,
      status: "publish",
    });

    const wcProducts = response.data as WooCommerceProduct[];
    console.log('[API] Raw frames count:', wcProducts.length);
    
    const products = await Promise.all(
      wcProducts.map((wcProduct) => normalizeProduct(wcProduct, api))
    );

    // Filter out progressive lenses
    const filteredProducts = products.filter(p => !p.name.toLowerCase().includes("progressive"));
    console.log('[API] Filtered frames count:', filteredProducts.length);

    res.status(200).json(filteredProducts);
  } catch (error) {
    console.error("[API] Error fetching products:", error);
    res.status(500).json({ 
      error: "Failed to fetch products",
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
