
import type { VercelRequest, VercelResponse } from '@vercel/node';
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const api = new (WooCommerceRestApi as any).default({
  url: process.env.WOOCOMMERCE_URL,
  consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY,
  consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET,
  version: "wc/v3",
  queryStringAuth: true,
  ...(process.env.LOCALWP_USERNAME && process.env.LOCALWP_PASSWORD ? {
    axiosConfig: {
      auth: {
        username: process.env.LOCALWP_USERNAME,
        password: process.env.LOCALWP_PASSWORD,
      },
    },
  } : {}),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const response = await api.get("products/categories", {
      per_page: 100,
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
}
