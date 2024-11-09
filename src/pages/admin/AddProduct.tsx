import { FC, useState } from "react";
import CategorySelection from "./forms/Categories/CategorySelection";
import { categories } from "../../constants/Navlinks";
import SelectComponent from "../../components/ui/SelectComponent";


export const AddProduct: FC = () => {
  const [category, setCategory] = useState<string>("");
  const categoryOptions = categories
    .filter((category) => category.name !== "All")
    .map((category) => ({
      value: category.name,
      label: category.name,
    }));
const [searchTerm, setSearchTerm] = useState("");
  return (
    <section className="flex flex-col gap-4 justify-center items-center mt-10 w-[90%] sm:w-[80%] md:w-[70%] lg:w-1/2 xl:w-1/2 mx-auto">
      <p className="text-2xl font-bold bg-white p-4 rounded-md w-full text-center">
        Add Product
      </p>

      <section className="flex flex-col gap-4 w-full bg-white p-4 rounded-md">
        <SelectComponent
          options={categoryOptions}
          placeholder="Category"
          onChange={(e) => setCategory(e)}
          searchPlaceholder="Search Category"
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <CategorySelection category={category} />
      </section>
    </section>
  );
};
