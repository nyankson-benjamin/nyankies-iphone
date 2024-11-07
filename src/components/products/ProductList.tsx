import { useProducts } from "../../hooks/useProducts";
import ProductCard, { Product } from "./ProductCard";
import ResponsiveGrid from "../common/ResponsiveGrid";
import NoItemsFound from "./NoItemsFound";
export default function ProductList() {
  const { data } = useProducts();
  interface Products {
    products: Product[];
  }
  console.log((data as Products)?.products);
  const products = (data as Products)?.products?.map((product: Product) => {
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
      {products?.length === 0 ? (
        <NoItemsFound />
      ) : (
        products?.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))
      )}
    </ResponsiveGrid>
  );
}
