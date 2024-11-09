import { create } from "zustand";
import { PhoneStore } from "../../types/phoneTypes";
import { devtools } from "zustand/middleware";

export const initialState = {
  battery: "",
  batteryType: "",
  body: "",
  camera: "",
  chipset: "",
  comment: "",
  device_image: "",
  device_name: "",
  display_res: "",
  display_size: "",
  key: "",
  ram: "",
  release_date: "",
  storage: "",
  video: "",
  os_type: "",
  network: "",
  processor: "",
  pictures: []
};
export const useAddPhone = create<PhoneStore>()(
  devtools((set) => ({
    details: {
      ...initialState
    },
    setDetails: (details) => set({ details }),
    images: [],
    setImages: (images) => set({ images }),
    brand: "",
    setBrand: (brand) => set({ brand }),
    model: "",
    setModel: (model) => set({ model }),
    condition: "",
    setCondition: (condition) => set({ condition }),
    category: "",
    setCategory: (category) => set({ category }),
    reset: () => set({ details: { ...initialState }, images: [], brand: "", model: "", condition: "", category: "" }),  
  }))
);
