import { useCartStore } from "../store/useCart";
import NoItemsFound from "../components/products/NoItemsFound";
import PayStack from "../components/payment/PayStack";
import HorizontalLine from "../components/HorizontalLine";
import API from "../services/axiosInstance";
import { useAuthStore } from "../store/AuthStore";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { useState } from "react";

export default function CartPage() {
  const { cart, cartTotal, updateCartItemQuantity, removeFromCart, clearCart } =
    useCartStore();
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const hanndleCheckOut = async () => {
    console.log("checkout");

    try {
      setIsLoading(true);
      const response = await API.post("/api/checkout", {
        products: cart,
        shippingAddress: {
          address: user?.address,
          phone: user?.phone,
          location: user?.location,
        },
        email: user?.email,
        userId: user?.id,
        totalAmount: cartTotal,
      });
      clearCart();
      setIsLoading(false);
      console.log(response);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Cart</h1>

      {cart.length === 0 ? (
        <NoItemsFound text="Your cart is empty." />
      ) : (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white rounded-lg shadow p-6 flex flex-col gap-4">
              {cart.map((item, index) => (
                <>
                  <div
                    key={item._id + index}
                    className="flex items-center justify-between gap-4 flex-col sm:flex-col md:flex-row lg:flex-row pb-4"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-gray-500">GHS {item.price}</p>
                        <p className="text-gray-500">
                          Total: GHS {item.price * item.quantity}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center border rounded">
                        <button
                          className="px-3 py-1 hover:bg-gray-100"
                          onClick={() =>
                            updateCartItemQuantity(item._id, item.quantity - 1)
                          }
                        >
                          -
                        </button>
                        <span className="px-3 py-1">{item.quantity}</span>
                        <button
                          className="px-3 py-1 hover:bg-gray-100"
                          onClick={() =>
                            updateCartItemQuantity(item._id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => removeFromCart(item._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  {index < cart.length - 1 && <HorizontalLine />}
                </>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="bg-white rounded-lg shadow p-6 flex flex-col gap-4">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>GHS {cartTotal}</span>
                </div>
                {/* <div className="flex justify-between">
              <span>Shipping</span>
              <span>$9.99</span>
            </div> */}
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>GHS {cartTotal}</span>
                  </div>
                </div>
              </div>
              {isAuthenticated ? (
                <PayStack
                  amount={cartTotal}
                  handlePurchase={() => hanndleCheckOut()}
                  loading={isLoading}
                  disabled={false}
                  email={""}
                />
              ) : (
                <Button onClick={() => navigate("/login")}>
                  Login to Checkout
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
