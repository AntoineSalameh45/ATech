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
  };
  Profile: {
    name: string;
  };
  Cart: undefined;
};
