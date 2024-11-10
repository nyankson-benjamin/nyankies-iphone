export interface Image {
  image: string;
  id: string;
}
export interface ImageStore {
  images: Image[];
  setImages: (images: Image[]) => void;
  reset: () => void;
  addImage: (image: Image) => void;
}
