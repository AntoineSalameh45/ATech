export interface iCustomModalOption {
  text: string;
  onPress: () => void;
}

export interface iCustomModalProps {
  visible: boolean;
  title: string;
  message?: string;
  options: iCustomModalOption[];
  onClose: () => void;
}
