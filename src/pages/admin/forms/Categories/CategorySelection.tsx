import { Phones } from "./Phones";


export default function CategorySelection({ category }: { category: string }) {
 


  return (
    <div className="w-full">
      {category === "Phones" && <Phones />}
     
    </div>
  );
}
