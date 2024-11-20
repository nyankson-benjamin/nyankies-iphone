import ProductList from "../components/products/ProductList";

export default function ProductsPage() {
  return (
    <div>
      <ProductList endpoint="/products"/>
    </div>
  );
}
