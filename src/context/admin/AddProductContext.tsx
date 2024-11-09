import { createContext, useState, useMemo } from "react";

export const AddProductContext = createContext({});

export const AddProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [category, setCategory] = useState<string>("");
  const [stage, setStage] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const value = useMemo(
    () => ({
      category,
      setCategory,
      stage,
      setStage,
      selectedImage,
      setSelectedImage,
    }),
    [category, stage, selectedImage]
  );

  return (
    <AddProductContext.Provider value={value}>
      {children}
    </AddProductContext.Provider>
  );
};
