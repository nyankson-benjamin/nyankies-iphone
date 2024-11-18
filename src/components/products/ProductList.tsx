import ProductCard from "./ProductCard";
import ResponsiveGrid from "../common/ResponsiveGrid";
import NoItemsFound from "./NoItemsFound";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { IProduct } from "../../types/apiResponseTypes";
import { useProductStore } from "../../store/productStore";
import ErrorPage from "../error/ErrorPage";
export default function ProductList({
  loading,
  error,
  isError,
}: Readonly<{
  products: IProduct[];
  loading: boolean;
  error: Error | null;
  isError: boolean;
}>) {
  const { products } = useProductStore();

  if (loading) {
    return (
      <ResponsiveGrid>
        {Array.from({ length: 20 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </ResponsiveGrid>
    );
  }
  if (isError) return <ErrorPage message={error?.message} />;
  if(!loading && !isError && products?.length === 0 ) return  <NoItemsFound />
  return (
    <ResponsiveGrid key={products.length}>
      {products?.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </ResponsiveGrid>
  );
}
