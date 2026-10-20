import { useState } from "react";
import { postProducts } from "../services/api";
import type { Product } from "../types/product";

export const useAdd = () => {
  const [data, setData] = useState<null | Product>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | Error>(null);
  const addProduct = async (product: Omit<Product, "id">) => {
    try {
      setLoading(true);
      setError(null);
      const result = await postProducts(product);
      setData(result);
    } catch (err: unknown) {
      err instanceof Error ? err.message : "unknown error";
      setError(err instanceof Error ? err : new Error("unknown error"));
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, addProduct };
};
