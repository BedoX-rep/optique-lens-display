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
    const categoriesResponse = await api.get("products/categories", {
      slug: "frames",
    });

    let categoryId;
    if (categoriesResponse.data.length > 0) {
      categoryId = categoriesResponse.data[0].id;
    }

    const response = await api.get("products", {
      ...(categoryId && { category: categoryId }),
      per_page: 100,
      status: "publish",
    });

    const wcProducts = response.data as WooCommerceProduct[];
    const products = await Promise.all(
      wcProducts.map((wcProduct) => normalizeProduct(wcProduct, api))
    );

    const trendingFrames = products
      .filter(p => !p.name.toLowerCase().includes("progressive"))
      .slice(0, 4);

    res.status(200).json(trendingFrames);
  } catch (error) {
    console.error("Error fetching trending frames:", error);
    res.status(500).json({ error: "Failed to fetch trending frames" });
  }
}
