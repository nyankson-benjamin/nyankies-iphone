import { IProduct } from "./apiResponseTypes";

export interface ProductState {
  products: IProduct[];
  setProducts: (products: IProduct[]) => void;
  addProduct: (product: IProduct) => void;
  removeProduct: (id: string) => void;
}