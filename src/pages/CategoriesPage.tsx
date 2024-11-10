import { useParams } from "react-router-dom";
import API from "../services/axiosInstance";
import { IProduct } from "../types/apiResponseTypes";
import { useState, useEffect } from "react";
import ProductList from "../components/products/ProductList";

export default function CategoriesPage() {
  const { categoryId } = useParams();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await API.get(`/api/categories/${categoryId}`);
      console.log(response.data);
      setProducts(response.data as IProduct[]);
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [categoryId]);

  return (
    <div>
      <ProductList products={products} loading={loading} error={error} />
    </div>
  );
}
