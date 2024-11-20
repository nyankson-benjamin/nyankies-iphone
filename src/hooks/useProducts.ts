import API from "../services/axiosInstance";
import { IProduct } from "../types/apiResponseTypes";
import { useProductStore } from "../store/productStore";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/AuthStore";
import { isLoggedIn } from "../services/auth";

export const useProducts = (endpoint="/api/products") => {
  const setProducts = useProductStore((state) => state.setProducts);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<IProduct[]>([]);
  const { user } = useAuthStore();

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const response = await API.get<IProduct[]>("/api/"+endpoint);
        setData(response?.data ?? []);
        if (isLoggedIn() && user?.role === "admin") {
          setProducts(response?.data || []);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
        setIsError(true);
        setError(error as Error);
      }
    };
    getProducts();
  }, [endpoint, setProducts, user?.role]);

  return { isLoading: loading, error, isError, data };
};
