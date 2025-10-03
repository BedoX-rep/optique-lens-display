import type { VercelRequest, VercelResponse } from '@vercel/node';
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import type { WooCommerceProduct, WooCommerceVariation, Product } from "../../shared/woocommerce-types";

// Initialize WooCommerce API
const hasWooCommerceCredentials = !!(
  process.env.WOOCOMMERCE_URL &&
  process.env.WOOCOMMERCE_CONSUMER_KEY &&
  process.env.WOOCOMMERCE_CONSUMER_SECRET
);

let api: any = null;
if (hasWooCommerceCredentials) {
  const config: any = {
    url: process.env.WOOCOMMERCE_URL,
    consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY,
    consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET,
    version: "wc/v3",
    queryStringAuth: true,
  };

  if (process.env.LOCALWP_USERNAME && process.env.LOCALWP_PASSWORD) {
    config.axiosConfig = {
      auth: {
        username: process.env.LOCALWP_USERNAME,
        password: process.env.LOCALWP_PASSWORD,
      },
    };
  }

  // @ts-ignore
  api = new WooCommerceRestApi.default(config);
}

// Convert price string to cents
function priceToCents(priceString: string): number {
  const price = parseFloat(priceString);
  return Math.round(price * 100);
}

// Normalize WooCommerce product to our Product type
async function normalizeProduct(wcProduct: WooCommerceProduct): Promise<Product> {
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
        image: v.image ? {
          src: v.image.src,
          alt: v.image.alt,
        } : undefined,
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

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (!api) {
    return res.status(500).json({ error: "WooCommerce API not configured" });
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
    const product = await normalizeProduct(wcProduct);

    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
}
