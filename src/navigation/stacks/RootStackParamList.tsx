export type RootStackParamList = {
    Home: undefined;
    Login: undefined;
    SignUp: undefined;
    OTP: { email: string };
    Camera: undefined;
    Details: {
      title: string;
      description: string;
      price: number;
      imageUrl: string;
    };
    Profile: {
      name: string;
    };
  };
