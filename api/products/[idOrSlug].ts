import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createWooCommerceApi, normalizeProduct } from "../../shared/woocommerce-utils.js";
import type { WooCommerceProduct } from "../../shared/woocommerce-types.js";

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
    const { idOrSlug } = req.query;
    
    if (!idOrSlug || typeof idOrSlug !== 'string') {
      return res.status(400).json({ error: "Invalid product identifier" });
    }

    let response;
    
    if (!isNaN(Number(idOrSlug))) {
      response = await api.get(`products/${idOrSlug}`);
    } else {
      const searchResponse = await api.get("products", {
        slug: idOrSlug,
      });
      if (searchResponse.data.length === 0) {
        return res.status(404).json({ error: "Product not found" });
      }
      response = { data: searchResponse.data[0] };
    }

    const wcProduct = response.data as WooCommerceProduct;
    const product = await normalizeProduct(wcProduct, api);

    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
}
