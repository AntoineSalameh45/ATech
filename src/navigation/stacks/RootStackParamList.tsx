export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  SignUp: undefined;
  OTP: {email: string};
  Camera: {onPhotoTaken: (photoUri: string) => void};
  Details: {
    _id: string;
    title: string;
    description: string;
    price: number;
    images: {url: string}[];
    latitude: number;
    longitude: number;
    user: {email: string, id: string};
    locationName: string;
  };
  EditProduct: {
    productId: string;
    title: string;
    description: string;
    price: number;
    images: { url: string }[];
    latitude: number;
    longitude: number;
    locationName: string;
  };
  Profile: {
    name: string;
  };
  Cart: undefined;
};
