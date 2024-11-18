
import ProductList from "../components/products/ProductList";
import { useProducts } from "../hooks/useProducts";
import { useProductStore } from "../store/productStore";

export default function ProductsPage() {
  const { isLoading, isError, error } = useProducts();
  const products = useProductStore((state) => state.products);

  return (
    <div>
      <ProductList
        products={products}
        loading={isLoading}
        error={error}
        isError={isError}
        key={products.length}
      />
    </div>
  );
}
