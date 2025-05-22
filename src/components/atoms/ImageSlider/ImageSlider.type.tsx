export interface ImageSliderProps {
  images: {url: string}[];
  onImageLongPress?: (url: string) => void;
}
