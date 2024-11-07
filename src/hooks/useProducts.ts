import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useProducts = () => {
  const getProducts = async () => {
    const response = await axios.get(
      `https://dummyjson.com/products/category/smartphones`
    );
    return response.data;
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["smartphones"],
    queryFn: () => getProducts(),
  });
  return { data, isLoading, isError };
};
