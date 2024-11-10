import { useState } from "react";
import { useAlert } from "./useAlert";
import { useImages } from "../store/imageStore";
import { v4 as uuidv4 } from 'uuid';

const useFileUpload = (onFileChange?: (file: File) => void,) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const {showAlert} = useAlert();
  const {addImage} = useImages()

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const files = e.dataTransfer.files;
    
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, maxSize?: number, multiple = false) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    
    if (multiple) {
      fileArray.forEach(file => {
        if (maxSize && file.size / 1024 / 1024 > maxSize) {
          showAlert(`File size should not be more than ${maxSize}MB`, "error");
          return;
        }
        handleFile(file);
      });
    } else {
      if (maxSize && files[0].size / 1024 / 1024 > maxSize) {
        showAlert(`File size should not be than ${maxSize}MB`, "error");
        return;
      }
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    setFile(file);
    if (onFileChange) {
      onFileChange(file);
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
      addImage({image:reader.result as string,id:uuidv4()})
    };
    reader.readAsDataURL(file);
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
  };

  return {
    isDragActive,
    file,
    preview,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleFileChange,
    clearFile,
  };
};

export default useFileUpload;
