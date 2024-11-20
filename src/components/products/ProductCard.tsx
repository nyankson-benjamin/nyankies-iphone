import { useLocation } from "react-router-dom";
import CartIcon from "../../assets/icons/CartIcon";
import DeleteIcon from "../../assets/icons/DeleteIcon";
import { useAuthStore } from "../../store/AuthStore";
import { useCartStore } from "../../store/useCart";
import { IProduct } from "../../types/apiResponseTypes";
import { Button } from "../ui/Button";
import EditIcon from "../../assets/icons/EditIcon";
import { useAlert } from "../../hooks/useAlert";
import API from "../../services/axiosInstance";
import { useProductStore } from "../../store/productStore";
import { useState } from "react";

interface ProductCardProps {
  product: IProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { user } = useAuthStore();
  const location = useLocation();
  const { addToCart } = useCartStore();
  const { showAlert } = useAlert();
  const { removeProduct } = useProductStore();
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDelete = async () => {
    console.log("delete", product._id);

    try {
      setIsDeleting(true);
      const response = await API.delete(`/api/product/${product._id}`);
      console.log(response);
      removeProduct(product._id);
      showAlert("Product deleted successfully", "success");
      setIsDeleting(false);
    } catch (error) {
      console.log(error);
      setIsDeleting(false);
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200 bg-white">
      <div className="flex flex-col items-center justify-between h-full">
        <div className="flex flex-col items-center">
          <img
            src={product.images?.[0]}
            alt={product.title}
            width="95%"
            height={100}
            className="object-cover rounded-md mb-3"
          />
          <h2 className="font-semibold text-lg mb-2">{product.title}</h2>
          <p className="text-green-600 font-medium mb-3">
            GHS {product.price.toFixed(2)}
          </p>
        </div>
        <div className="flex items-center flex-col justify-center gap-2 w-full">
          {location.pathname !== "/admin/dashboard" && (
            <Button
              className="w-full flex items-center justify-center gap-2"
              onClick={() => {
                addToCart({ ...product, quantity: 1 });
              }}
            >
              <CartIcon />
              Add to Cart
            </Button>
          )}

          {user?.role === "admin" &&
            location.pathname === "/admin/dashboard" && (
              <div className="flex flex-col gap-2 w-full">
                <Button className="w-full flex items-center justify-center gap-2">
                  <EditIcon />
                  Edit
                </Button>
                <Button
                  className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600"
                  onClick={() => {
                    handleDelete();
                  }}
                  disabled={isDeleting}
                  isLoading={isDeleting}
                >
                  <DeleteIcon />
                  Delete
                </Button>

                
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
