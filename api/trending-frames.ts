
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

interface WooCommerceProduct {
  id: number;
  name: string;
  slug: string;
  price: string;
  regular_price: string;
  sale_price: string;
  description: string;
  short_description: string;
  sku: string;
  stock_status: string;
  categories: Array<{ id: number; name: string; slug: string }>;
  images: Array<{ id: number; src: string; alt: string }>;
  attributes: Array<{ id: number; name: string; options: string[]; variation: boolean }>;
  variations?: number[];
}

interface WooCommerceVariation {
  id: number;
  price: string;
  attributes: Array<{ id: number; name: string; option: string }>;
  image?: { id: number; src: string; alt: string };
  stock_status: string;
}

function priceToCents(priceString: string): number {
  const price = parseFloat(priceString);
  return Math.round(price * 100);
}

async function normalizeProduct(wcProduct: WooCommerceProduct) {
  const category = wcProduct.categories[0];
  
  let variations;
  let colorImages: Record<string, string> = {};
  
  if (wcProduct.variations && wcProduct.variations.length > 0) {
    try {
      const variationsResponse = await api.get(`products/${wcProduct.id}/variations`, {
        per_page: 100,
      });
      const wcVariations = variationsResponse.data as WooCommerceVariation[];
      
      variations = wcVariations.map((v) => ({
        id: v.id,
        price: priceToCents(v.price),
        attributes: v.attributes.reduce((acc, attr) => {
          acc[attr.name] = attr.option;
          return acc;
        }, {} as Record<string, string>),
        image: v.image ? { src: v.image.src, alt: v.image.alt } : undefined,
        inStock: v.stock_status === "instock",
      }));

      wcVariations.forEach((v) => {
        const colorAttr = v.attributes.find(attr => attr.name.toLowerCase() === 'color');
        if (colorAttr && v.image) {
          colorImages[colorAttr.option.toLowerCase()] = v.image.src;
        }
      });
    } catch (error) {
      console.error(`Error fetching variations for product ${wcProduct.id}:`, error);
    }
  }

  const attributes: Record<string, string[]> = {};
  wcProduct.attributes.forEach((attr) => {
    attributes[attr.name] = attr.options;
  });

  return {
    id: wcProduct.id,
    name: wcProduct.name,
    slug: wcProduct.slug,
    price: priceToCents(wcProduct.price),
    regularPrice: wcProduct.regular_price ? priceToCents(wcProduct.regular_price) : undefined,
    salePrice: wcProduct.sale_price ? priceToCents(wcProduct.sale_price) : undefined,
    description: wcProduct.description,
    shortDescription: wcProduct.short_description,
    sku: wcProduct.sku,
    inStock: wcProduct.stock_status === "instock",
    category: category?.name || "Uncategorized",
    categorySlug: category?.slug || "uncategorized",
    images: wcProduct.images.map((img) => ({
      id: img.id,
      src: img.src,
      alt: img.alt || wcProduct.name,
    })),
    attributes,
    variations,
    colorImages,
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const categoriesResponse = await api.get("products/categories", {
      slug: "frames",
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
      wcProducts.map((wcProduct) => normalizeProduct(wcProduct))
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
