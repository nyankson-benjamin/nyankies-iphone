export interface IProduct {
  _id: string;
  price: number;
  brand: string;
  category: string;
  stock: number;
  images: string[];
  title: string;
}
export interface Products {
  products: IProduct[];
}
