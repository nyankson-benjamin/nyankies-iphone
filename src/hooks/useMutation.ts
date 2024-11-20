import API from "../services/axiosInstance";
import { useState } from "react";

export type APIMethods = "post" | "put" | "patch"
export default function useMutation() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const fetchData = async <T>(
    endpoint: string,
    method:APIMethods,
    queryData?: Record<string, string | number>,
    callback?:()=>void
  ) => {
    try {
      setIsLoading(true);
      const response = await API[method?.toLowerCase() as APIMethods]<T>(`/api/${endpoint}`, queryData);
      setIsLoading(false);
      setIsError(false);
      setError(null);
      if(callback){
        callback()
      }
      return response.data;
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      setError(error as Error);
      console.log("eror");
    }
  };

  return { isLoading, isError, error, fetchData };
}
