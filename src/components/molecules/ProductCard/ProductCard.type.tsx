export interface iProductCardProps {
  item: {
    title: string;
    description: string;
    price: number;
    images: {url: string}[];
  };
  onPress: () => void;
  styles: any;
}
