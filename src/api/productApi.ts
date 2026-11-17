import type { Product, ProductResponse } from "../types/product";

const API_URL = "https://dummyjson.com";

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(
    `${API_URL}/products/category/groceries?limit=100`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: ProductResponse = await response.json();
  return data.products;
};

export const getProductById = async (id: string): Promise<Product> => {
  const response = await fetch(`${API_URL}/products/${id}`);

  if (!response.ok) {
    throw new Error("Product not found");
  }

  return response.json();
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  const response = await fetch(
    `${API_URL}/products/search?q=${encodeURIComponent(query)}`,
  );

  if (!response.ok) {
    throw new Error("Product search failed");
  }

  const data: ProductResponse = await response.json();
  return data.products;
};
