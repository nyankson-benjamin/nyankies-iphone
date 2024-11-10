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
  pictures: { image: string; id: string, }[];
}

export interface PhoneStore {
  details: IPhoneDetails;
  setDetails: (details: IPhoneDetails) => void;
  images: { image: string; id: string, }[];
  setImages: (images: { image: string; id: string, }[]) => void;
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
