import { useQuery } from '@tanstack/react-query';
import API from '../services/axiosInstance';
import { IProduct } from '../types/apiResponseTypes';
import { useProductStore } from '../store/productStore';

export const useProducts = () => {
  const setProducts = useProductStore((state) => state.setProducts);  
  const getProducts = async () => {
    const response = await API.get<IProduct[]>(
      `/api/products`
    );

    return response.data;
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });
  setProducts(data || []);
  return { data, isLoading, isError };
};
