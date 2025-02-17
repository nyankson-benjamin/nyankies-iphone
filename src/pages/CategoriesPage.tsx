import { useParams } from "react-router-dom";
import ProductList from "../components/products/ProductList";

export default function CategoriesPage() {
  const { categoryId } = useParams();
  

  return (
    <div>
      <ProductList  endpoint={`categories/${categoryId}`} />
    </div>
  );
}
