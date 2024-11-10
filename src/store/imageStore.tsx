import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { ImageStore } from "../types/imageType";

export const useImages = create<ImageStore>()(
  devtools((set) => ({
    images: [],
    setImages: (images) => set({ images }),
    addImage: (image) => set((state) => ({ images: [...state.images, image] })),
    reset: () => set({ images: [] }),
  }))
);
