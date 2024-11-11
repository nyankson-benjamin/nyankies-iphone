import { create } from "zustand";
import { CartStore, CartItem } from "../types/cartStore"; // Ensure CartItem and CartStore types are correctly defined
import { persist, devtools } from "zustand/middleware";

export const useCartStore = create<CartStore>()(
  devtools(
    persist(
      (set, get) => ({
        cart: [],
        cartTotal: 0,
        message: "",

        addToCart: (product: CartItem) =>
          set((state) => {
            const existingItem = state.cart.find(
              (item) => item._id === product._id
            );

            if (existingItem) {
              return {
                cart: state.cart.map((item) =>
                  item._id === product._id
                    ? { ...item, quantity: (item.quantity || 1) + 1 }
                    : item
                ),
                cartTotal: state.cartTotal + product.price,
                message: "Item added to cart",
              };
            }

            // New item with quantity 1
            return {
              cart: [...state.cart, { ...product, quantity: 1 }],
              cartTotal: state.cartTotal + product.price,
              message: "Item added to cart",
            };
          }),

        removeFromCart: (productId: string) =>
          set((state) => {
            const itemToRemove = state.cart.find(
              (item) => item._id === productId
            );
            return {
              cart: state.cart.filter((item) => item._id !== productId),
              cartTotal:
                state.cartTotal -
                (itemToRemove?.price || 0) * (itemToRemove?.quantity || 1),
              message: "Item removed from cart",
            };
          }),

        clearCart: () =>
          set({ cart: [], cartTotal: 0, message: "Cart cleared" }),

        updateCartItemQuantity: (productId: string, quantity: number) =>
          set((state) => {
            // Ensure quantity is not negative
            const safeQuantity = Math.max(1, quantity);
            
            const updatedCart = state.cart.map((item) =>
              item._id === productId ? { ...item, quantity: safeQuantity } : item
            );
            const newTotal = updatedCart.reduce(
              (acc, item) => acc + item.price * (item.quantity || 0),
              0
            );
            return {
              cart: updatedCart,
              cartTotal: newTotal,
              message: "Item quantity updated",
            };
          }),

        // Optional getter if needed
        getCartTotal: () => get().cartTotal,
      }),
      {
        name: "cart-storage", // name of the storage
      }
    )
  )
);
