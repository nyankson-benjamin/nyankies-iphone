import { useQuery } from "@tanstack/react-query";
import API from "../services/axiosInstance";
import { IProduct } from "../types/apiResponseTypes";
import { useProductStore } from "../store/productStore";
import { useEffect, useState } from "react";

export const useProducts = () => {
  const setProducts = useProductStore((state) => state.setProducts);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const getProducts = async () => {
    try {
      setLoading(true)
      const response = await API.get<IProduct[]>(`/api/products`);
      setProducts(response?.data ||[])
      setLoading(false)
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false)
      setIsError(true)
      setError(error)
      // throw error;
    }
  };
  
  useEffect(()=>{
    getProducts()
  },[])

  // const { data, isLoading, isError } = useQuery({
  //   queryKey: ["products"],
  //   queryFn: () => getProducts(),
  //   onSettled: () => {
  //     setLoading(false);
  //   },
  // });

  // if (!isLoading && !isError && data?.length) {
  //   setProducts(data || []);
  // } else {
  //   setProducts([]);
  // }

  return { isLoading: loading, error, isError};
};
