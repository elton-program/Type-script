import { useEffect, useState } from "react";
import { fetchProduct } from "../services/api";
import type { Product } from "../types/product";

export const useProduct = () => {
  const [product, setProduct] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const res = await fetchProduct();
        setProduct(res);
        setError(null);
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : "Unknown error"
        );
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return { product, loading, error };
};