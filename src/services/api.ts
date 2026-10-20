import axios from "axios";
import type { EditPro, Product } from "../types/product";

export const fetchProduct = async (): Promise<Product[]> => {
  const response = await fetch("https://dummyjson.com/products");

  if (!response.ok) {
    throw new Error("Failed to fetch product data");
  }

  const data = await response.json();

  return data.products;
};

export const postProducts = async (
  product: Omit<Product, "id">,
): Promise<Product> => {
  const result = await axios.post<Product>(
    "https://dummyjson.com/products/add",
    product,
  );
  return result.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await axios.delete(`https://dummyjson.com/products/${id}`);
};
export const EditProduct = async (
  id: number,
  product: Product,
): Promise<EditPro> => {
  const result = await axios.put(`https://dummyjson.com/products/${id}`,product);
  if (!result) {
    throw new Error("Failed to fetch product data");
  }
  return result.data;
};