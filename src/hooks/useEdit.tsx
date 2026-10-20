import { useState } from "react";
import type { Product } from "../types/product";
import { EditProduct } from "../services/api";

export const useEdit = () => {
  const [data, setData] = useState<Product | null>(null);
  const Edit = async (id: number, product: Product) => {
    try {
      const result = await EditProduct(id, product);
      setData(result);
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw err.message;
      }
    }
  };
  return { data, Edit };
};
