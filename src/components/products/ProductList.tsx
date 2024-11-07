import { useProducts } from "../../hooks/useProducts";
import ProductCard, { Product } from "./ProductCard";
import ResponsiveGrid from "../common/ResponsiveGrid";
import NoItemsFound from "./NoItemsFound";
import ProductCardSkeleton from "./ProductCardSkeleton";
export default function ProductList() {
  const { data, isLoading } = useProducts();
  interface IProduct {
    id: string;
    title: string;
    price: number;
    images: string[];
    category: string;
  }
  interface Products {
    products: IProduct[];
  }
  console.log((data as Products)?.products);
  const products = (data as Products)?.products?.map((product: IProduct) => {
    return {
      id: product?.id,
      name: product?.title,
      price: product?.price,
      image: product?.images[0],
      category: product?.category,
    };
  });

  console.log(products);
  return (
    <ResponsiveGrid>
      {isLoading ? (
        Array.from({ length: 20 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))
      ) : products?.length === 0 ? (
        <NoItemsFound />
      ) : (
        products?.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))
      )}
    </ResponsiveGrid>
  );
}
