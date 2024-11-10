
import ProductList from "../components/products/ProductList";
import { useProducts } from "../hooks/useProducts";
import { useProductStore } from "../store/productStore";

export default function ProductsPage() {
  const { isLoading } = useProducts();
  const products = useProductStore((state) => state.products);

  return (
    <div>
      <ProductList
        products={products}
        loading={isLoading}
        error={null}
        key={products.length}
      />
    </div>
  );
}
