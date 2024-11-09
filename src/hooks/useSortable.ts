import { useSortable } from "@dnd-kit/sortable";
import {  useState } from "react";
import { CSS } from "@dnd-kit/utilities";
export default function useTasksSortable(task: {image: string, id: string}) {
  const [isEditMode, setIsEditMode,] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: isEditMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };


  return {
    setNodeRef,
    attributes,
    listeners,
    isDragging,
    style,
    isEditMode,
    setIsEditMode,

  };
}
