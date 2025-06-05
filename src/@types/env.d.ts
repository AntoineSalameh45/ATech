declare module '@env' {
  export const BASE_URL: string;
  export const ONE_SIGNAL_APPID: string;
  export const ONE_SIGNAL_APIKEY: string;
}

declare module 'react-native-config' {
  export interface NativeConfig {
    BASE_URL?: string;
    ONE_SIGNAL_APPID?: string;
    ONE_SIGNAL_APIKEY?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
