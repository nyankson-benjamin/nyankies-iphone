import { IProduct } from "./apiResponseTypes";

export interface CartItem extends IProduct {
  quantity: number;
}
export interface CartStore {
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  updateCartItemQuantity: (productId: string, quantity: number) => void;
  getCartTotal: () => void;
  cartTotal: number;
  message: string;
}
