import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import type { WooCommerceProduct, WooCommerceVariation, Product } from "@shared/woocommerce-types";

// Check if WooCommerce credentials are configured
const hasWooCommerceCredentials = !!(
  process.env.WOOCOMMERCE_URL &&
  process.env.WOOCOMMERCE_CONSUMER_KEY &&
  process.env.WOOCOMMERCE_CONSUMER_SECRET
);

// Initialize WooCommerce API only if credentials are available
let api: any = null;
if (hasWooCommerceCredentials) {
  const config: any = {
    url: process.env.WOOCOMMERCE_URL,
    consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY,
    consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET,
    version: "wc/v3",
    queryStringAuth: true, // Force query string auth for HTTPS
  };

  // Add site-level basic auth if LocalWP credentials are provided
  if (process.env.LOCALWP_USERNAME && process.env.LOCALWP_PASSWORD) {
    config.axiosConfig = {
      auth: {
        username: process.env.LOCALWP_USERNAME,
        password: process.env.LOCALWP_PASSWORD,
      },
    };
  }

  // @ts-ignore - The package has a default export
  api = new WooCommerceRestApi.default(config);
}

// Convert price string to cents
function priceToCents(priceString: string): number {
  const price = parseFloat(priceString);
  return Math.round(price * 100);
}

// Normalize WooCommerce product to our Product type
export async function normalizeProduct(wcProduct: WooCommerceProduct): Promise<Product> {
  const category = wcProduct.categories[0];
  
  // Fetch variations if product has them
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

      // Create color to image mapping
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

  // Convert attributes array to object
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

// Get all products
export async function getProducts(categorySlug?: string): Promise<Product[]> {
  try {
    const params: any = {
      per_page: 100,
      status: "publish",
    };

    if (categorySlug) {
      params.category = categorySlug;
    }

    const response = await api.get("products", params);
    const wcProducts = response.data as WooCommerceProduct[];
    
    const products = await Promise.all(
      wcProducts.map((wcProduct) => normalizeProduct(wcProduct))
    );

    return products;
  } catch (error) {
    console.error("Error fetching products from WooCommerce:", error);
    throw new Error("Failed to fetch products");
  }
}

// Get single product by ID or slug
export async function getProduct(idOrSlug: string | number): Promise<Product | null> {
  try {
    let response;
    
    if (typeof idOrSlug === "number" || !isNaN(Number(idOrSlug))) {
      response = await api.get(`products/${idOrSlug}`);
    } else {
      const searchResponse = await api.get("products", {
        slug: idOrSlug,
      });
      if (searchResponse.data.length === 0) {
        return null;
      }
      response = { data: searchResponse.data[0] };
    }

    const wcProduct = response.data as WooCommerceProduct;
    return await normalizeProduct(wcProduct);
  } catch (error) {
    console.error(`Error fetching product ${idOrSlug}:`, error);
    return null;
  }
}

// Get products by category
export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  try {
    // First get the category ID
    const categoriesResponse = await api.get("products/categories", {
      slug: categorySlug,
    });

    if (categoriesResponse.data.length === 0) {
      return [];
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

    return products;
  } catch (error) {
    console.error(`Error fetching products for category ${categorySlug}:`, error);
    throw new Error("Failed to fetch products by category");
  }
}
