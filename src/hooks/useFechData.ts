import { useQuery } from "@tanstack/react-query";
import API from "../services/axiosInstance";

export default function useFetchData<T>(endpoint: string, queryKey: string) {
    const fetchData = async () => {
        const response = await API.get<T>(`/api/${endpoint}`);
    return response.data;
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: [queryKey],
    queryFn: fetchData,
  });

  return { data, isLoading, isError };
}
