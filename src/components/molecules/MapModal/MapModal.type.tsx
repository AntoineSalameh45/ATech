export type MapModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave: () => void;
  onMapPress: (event: any) => void;
  selectedLocation: {latitude: number; longitude: number};
};
