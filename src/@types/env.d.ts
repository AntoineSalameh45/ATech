declare module '@env' {
  export const BASE_URL: string;
}

declare module 'react-native-config' {
  export interface NativeConfig {
    BASE_URL?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
