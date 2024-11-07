import { Button } from "../ui/Button";
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}
interface ProductCardProps {
  product: Product;
}
export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200 bg-white">
      <div className="flex flex-col items-center justify-between h-full">
        <div className="flex flex-col items-center">
          <img
            src={product.image}
            alt={product.name}
            width={100}
            height={100}
            className="object-cover rounded-md mb-3"
          />
          <h2 className="font-semibold text-lg mb-2">{product.name}</h2>
          <p className="text-green-600 font-medium mb-3">
            ${product.price.toFixed(2)}
          </p>
        </div>
        <Button
          className="w-full"
          onClick={() => {
            /* Add cart logic here */
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
          </svg>
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
