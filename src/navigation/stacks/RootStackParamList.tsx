export type RootStackParamList = {
    Home: undefined;
    Login: undefined;
    SignUp: undefined;
    OTP: { email: string };
    Details: {
      title: string;
      description: string;
      price: number;
      imageUrl: string;
    };
  };
