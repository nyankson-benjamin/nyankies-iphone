import { SortableImage } from "./SortableImage";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { closestCenter, DragEndEvent } from "@dnd-kit/core";
import { DndContext } from "@dnd-kit/core";
import useFileUpload from "../../../../hooks/useFileUpload";
import { UploadButton } from "../../../../components/UploadButton";
import AddIcon from "../../../../assets/icons/AddIcon";
import { useImages } from "../../../../store/imageStore";

export default function AddImages({
  maxSize = 2,
  multiple = true,
}: {
  maxSize: number;
  multiple: boolean;
}) {
  const { handleFileChange } = useFileUpload();
  const { setImages, images } = useImages();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const activeImageID = active.id;
    const overImageID = over.id;
    if (activeImageID === overImageID) return;
    const activeImageIndex = images.findIndex(
      (image) => image.id === activeImageID
    );
    const overImageIndex = images.findIndex(
      (image) => image.id === overImageID
    );
    setImages(arrayMove(images, activeImageIndex, overImageIndex));
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
          handleFileChange={(e) => handleFileChange(e, maxSize, multiple)}
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
