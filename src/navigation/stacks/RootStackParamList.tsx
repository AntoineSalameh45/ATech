export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  SignUp: undefined;
  OTP: {email: string};
  Camera: {onPhotoTaken: (photoUri: string) => void};
  Details: {
    title: string;
    description: string;
    price: number;
    images: {url: string}[];
  };
  Profile: {
    name: string;
  };
};
