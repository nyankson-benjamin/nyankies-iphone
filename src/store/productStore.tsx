import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProductState } from "../types/productStoreTypes";
import { IProduct } from "../types/apiResponseTypes";

export const useProductStore = create<ProductState>()(
  persist(
    (set) => ({
      products: [],
      setProducts: (products: IProduct[]) => set({ products }),
      addProduct: (product: IProduct) =>
        set((state) => ({ products: [...state.products, product] })),
      removeProduct: (id: string) =>
        set((state) => ({
          products: state.products.filter((product) => product._id !== id),
        })),
    }),
    {
      name: "products",
    }
  )
);
