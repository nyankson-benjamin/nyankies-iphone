import { create } from "zustand";

interface AddProductState {
  category: string;
  setCategory: (category: string) => void;
}

export const useAddProduct = create<AddProductState>((set) => ({
  category: "",
  setCategory: (category) => set({ category }),
}));
