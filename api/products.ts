import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createWooCommerceApi, normalizeProduct } from "../shared/woocommerce-utils.js";
import type { WooCommerceProduct } from "../shared/woocommerce-types.js";

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
    const categorySlug = req.query.category as string | undefined;

    const params: any = {
      per_page: 100,
      status: "publish",
    };

    if (categorySlug) {
      const categoriesResponse = await api.get("products/categories", {
        slug: categorySlug,
      });
      
      if (categoriesResponse.data.length > 0) {
        params.category = categoriesResponse.data[0].id;
      }
    }

    const response = await api.get("products", params);
    const wcProducts = response.data as WooCommerceProduct[];
    
    const products = await Promise.all(
      wcProducts.map((wcProduct) => normalizeProduct(wcProduct, api))
    );

    const filteredProducts = products.filter(p => !p.name.toLowerCase().includes("progressive"));

    res.status(200).json(filteredProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
}
