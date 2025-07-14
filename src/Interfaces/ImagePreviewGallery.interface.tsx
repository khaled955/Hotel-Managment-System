 export interface ImagePreviewGalleryProps {
   images: (File | string)[];
  setImages: React.Dispatch<React.SetStateAction<(string | File)[]>>;
  defaultImages?: string[];
  onRemove: (index: number) => void;
}
