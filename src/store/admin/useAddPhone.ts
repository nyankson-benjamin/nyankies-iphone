import { create } from "zustand";
import { PhoneStore } from "../../types/phoneTypes";
import { devtools } from "zustand/middleware";

export const useAddPhone = create<PhoneStore>()(
  devtools((set) => ({
    details: {
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
  }))
);
