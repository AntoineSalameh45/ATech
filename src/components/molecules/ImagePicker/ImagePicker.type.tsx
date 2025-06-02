export type ImagePickerProps = {
  images: Array<{uri: string}>;
  onAddImage: () => void;
  onRemoveImage: (index: number) => void;
  onOpenCamera: () => void;
};
