import ProductCard from "./ProductCard";
import ResponsiveGrid from "../common/ResponsiveGrid";
import NoItemsFound from "./NoItemsFound";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { IProduct } from "../../types/apiResponseTypes";
import { useProductStore } from "../../store/productStore";
export default function ProductList({
  loading,
  error,
}: {
  products: IProduct[];
  loading: boolean;
  error: string | null;
}) {
  const { products } = useProductStore();
  
  return (
    <ResponsiveGrid key={products.length}>
      {loading ? (
        Array.from({ length: 20 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))
      ) : products?.length === 0 ? (
        <NoItemsFound />
      ) : (
        products?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))
      )}
    </ResponsiveGrid>
  );
}
