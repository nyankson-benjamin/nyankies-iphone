import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DeleteIcon from "../../../../assets/icons/DeleteIcon";

interface SortableImageProps {
  image: { image: string; id: string };
  onDelete: () => void;
}

export function SortableImage({ image, onDelete }: SortableImageProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: image.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`relative group cursor-grab active:cursor-grabbing ${
        isDragging ? "opacity-50 border-2 border-[#a11515]" : ""
      }`}
    >
      <img
        src={image.image}
        alt="preview"
        className="w-16 h-16 rounded-md border border-gray-200 shadow-md"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <DeleteIcon onClick={onDelete} />
      </div>
    </div>
  );
}
