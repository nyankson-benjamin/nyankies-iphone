export const setOriginalImage = (image: string): void => {
    localStorage.setItem("originalImage", image);
  };
  
  export const getOriginalImage = (): string | null => {
    return localStorage.getItem("originalImage");
  };
  
  export const removeOriginalImage = (): void => {
    localStorage.removeItem("originalImage");
  };
  
  export const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
  
      reader.onload = function () {
        const base64 = reader.result as string;
        resolve(base64);
      };
  
      reader.onerror = reject;
    });
  };
  
  export const base64toBlob = async (base64: string): Promise<Blob | undefined> => {
    try {
      const response = await fetch(base64);
      const blob = await response.blob();
  
      return blob;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  };
  
  export const fileToBlob = (file: File): Blob => {
    return new Blob([file], { type: file.type });
  };