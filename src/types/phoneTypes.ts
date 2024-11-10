export interface IPhoneDetails {
  battery: string;
  batteryType: string;
  body: string;
  camera: string;
  chipset: string;
  comment: string;
  device_image: string;
  device_name: string;
  display_res: string;
  display_size: string;
  key: string;
  ram: string;
  release_date: string;
  storage: string;
  video: string;
  os_type: string;
  network: string;
  processor: string;
  pictures: string[];
}

export interface PhoneStore {
  details: IPhoneDetails;
  setDetails: (details: IPhoneDetails) => void;
  phoneImages: { image: string; id: string }[];
  setPhoneImages: (images: { image: string; id: string }[]) => void;
  brand: string;
  setBrand: (brand: string) => void;
  model: string;
  setModel: (model: string) => void;
  condition: string;
  setCondition: (condition: string) => void;
  category: string;
  setCategory: (category: string) => void;
  reset: () => void;
}
