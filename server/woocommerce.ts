import { createWooCommerceApi, normalizeProduct } from "@shared/woocommerce-utils";
import type { WooCommerceProduct, Product } from "@shared/woocommerce-types";

// Initialize WooCommerce API
const api = createWooCommerceApi();

// Get all products
export async function getProducts(categorySlug?: string): Promise<Product[]> {
  if (!api) {
    throw new Error("WooCommerce API not configured");
  }

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
      wcProducts.map((wcProduct) => normalizeProduct(wcProduct, api))
    );

    return products;
  } catch (error) {
    console.error("Error fetching products from WooCommerce:", error);
    throw new Error("Failed to fetch products");
  }
}

// Get single product by ID or slug
export async function getProduct(idOrSlug: string | number): Promise<Product | null> {
  if (!api) {
    throw new Error("WooCommerce API not configured");
  }

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
    return await normalizeProduct(wcProduct, api);
  } catch (error) {
    console.error(`Error fetching product ${idOrSlug}:`, error);
    return null;
  }
}

// Get products by category
export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  if (!api) {
    throw new Error("WooCommerce API not configured");
  }

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
      wcProducts.map((wcProduct) => normalizeProduct(wcProduct, api))
    );

    return products;
  } catch (error) {
    console.error(`Error fetching products for category ${categorySlug}:`, error);
    throw new Error("Failed to fetch products by category");
  }
}
