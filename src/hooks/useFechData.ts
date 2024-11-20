import { useQuery } from "@tanstack/react-query";
import API from "../services/axiosInstance";

export default function useFetchData<T>(endpoint: string, queryKey: string, queryData?:Record<string, string|number> ) {
  const fetchData = async () => {
    try {
      const response = await API.get<T>(`/api/${endpoint}`, queryData);
      return response.data;
    } catch (error) {
      console.log(error)
      console.log("eror");
      throw(error)
    }
  };
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [queryKey],
    queryFn: fetchData,
  });

  return { data, isLoading, isError, error };
}
