import ProductCard from "./ProductCard";
import ResponsiveGrid from "../common/ResponsiveGrid";
import NoItemsFound from "./NoItemsFound";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { useProductStore } from "../../store/productStore";
import ErrorPage from "../error/ErrorPage";
import { useProducts } from "../../hooks/useProducts";
import { isLoggedIn } from "../../services/auth";
import { useMemo } from "react";

export default function ProductList({endpoint}:{endpoint:string}) {
  const { products } = useProductStore();
  const { isLoading:loading, isError, error,data } = useProducts(endpoint);
  const productData = useMemo(()=>isLoggedIn() ? products : data,[data, products])

  if (loading && !productData?.length) {
    return (
      <ResponsiveGrid>
        {Array.from({ length: 20 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </ResponsiveGrid>
    );
  }
  if (isError) return <ErrorPage message={error?.message} />;
  if(!loading && !isError && productData?.length === 0 ) return  <NoItemsFound />
  return (
    <ResponsiveGrid key={productData.length}>
      {productData?.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </ResponsiveGrid>
  );
}
