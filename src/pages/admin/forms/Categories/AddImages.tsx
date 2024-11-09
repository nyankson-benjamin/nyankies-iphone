import { useEffect, useState } from "react";
import { SortableImage } from "./SortableImage";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { closestCenter, DragEndEvent } from "@dnd-kit/core";
import { DndContext } from "@dnd-kit/core";
import useFileUpload from "../../../../hooks/useFileUpload";
import { UploadButton } from "../../../../components/UploadButton";
import AddIcon from "../../../../assets/icons/AddIcon";
import { v4 as uuidv4 } from "uuid";

export default function AddImages({ handleSetImages }: { handleSetImages: (images: { image: string; id: string }[]) => void }) {
  const [images, setImages] = useState<{ image: string; id: string }[]>([]);
  const { handleFileChange, preview } = useFileUpload();

  useEffect(() => {
    if (preview) {
      setImages([...images, { image: preview, id: uuidv4() }]);
    }
  }, [preview]);

  useEffect(() => {
    handleSetImages(images);
  }, [images]);
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      setImages((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const newItems = [...items];
        const [removed] = newItems.splice(oldIndex, 1);
        newItems.splice(newIndex, 0, removed);
        return newItems;
      });
    }
  };
  return (
    <div className="flex gap-2 my-2 flex-col">
      <div className="space-y-1.5">
        <h3 className="text-base font-semibold">Upload Images</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <p>Add at least 2 photos for this category</p>
          <p>
            First picture is the title picture. You can change the order of
            photos by dragging them.
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <UploadButton
          handleFileChange={handleFileChange}
          className="bg-primary opacity-80 w-16 h-16 text-white flex items-center justify-center"
          disabled={images.length >= 5}
        >
          <AddIcon />
        </UploadButton>
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={images}
            strategy={horizontalListSortingStrategy}
          >
            {images.map((image) => (
              <SortableImage
                key={image.id}
                image={image}
                onDelete={() =>
                  setImages(images.filter((img) => img.id !== image.id))
                }
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}
