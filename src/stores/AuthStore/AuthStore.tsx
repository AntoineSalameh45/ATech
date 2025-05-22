import { create } from 'zustand';
import { createJSONStorage, persist, StateStorage } from 'zustand/middleware';
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage';
import { refreshTokenreq } from '../../services/auth';

export interface iAuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearTokens: () => void;
  setAuthenticated: (value: boolean) => void;
  refreshAccessToken: () => Promise<string | null>;
}

const SecureStorage: StateStorage = {
  setItem: async (name, value) => {
    console.log(`[SecureStorage] Setting item: ${name}`);
    await RNSecureStorage.setItem(name, value, {
      accessible: ACCESSIBLE.WHEN_UNLOCKED,
    });
    console.log(`[SecureStorage] Successfully set item: ${name}`);
  },

  getItem: async (name) => {
    try {
      const value = await RNSecureStorage.getItem(name);
      return value;
    } catch (error: any) {
      if (
        error.message.includes('Value for') &&
        error.message.includes('does not exist')
      ) {
        console.log(`[SecureStorage] Item ${name} not found, returning null.`);
        return null;
      }
      console.error(
        `[SecureStorage] Unexpected error getting item ${name}:`,
        error,
      );
      throw error;
    }
  },

  removeItem: async (name) => {
    await RNSecureStorage.removeItem(name);
  },
};

const useAuthStore = create<iAuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,

      setTokens: (accessToken, refreshToken) => {
        console.log('[AuthStore] Setting tokens:', { accessToken, refreshToken });
        set({ accessToken, refreshToken, isAuthenticated: !!accessToken });
      },

      clearTokens: () => {
        console.log('[AuthStore] Clearing tokens.');
        set({ accessToken: null, refreshToken: null, isAuthenticated: false });
      },

      setAuthenticated: (value) => {
        console.log(`[AuthStore] Setting authentication status: ${value}`);
        set({ isAuthenticated: value });
      },

      refreshAccessToken: async (): Promise<string | null> => {
        const refreshToken = get().refreshToken;

        if (!refreshToken) {
          console.error('[AuthStore] No refresh token available.');
          return null;
        }

        try {
          console.log('[AuthStore] Requesting new tokens with refresh token.');
          const response = await refreshTokenreq(refreshToken);
          console.log('[AuthStore] Refresh token response:', response);

          const { accessToken, refreshToken: newRefreshToken } = response.data;

          if (!accessToken || !newRefreshToken) {
            throw new Error('Invalid token response structure.');
          }

          set({ accessToken, refreshToken: newRefreshToken });
          console.log('[AuthStore] Access token refreshed.');
          return accessToken;
        } catch (error: any) {
          console.error('[AuthStore] Failed to refresh access token:', error);
          set({ accessToken: null, refreshToken: null, isAuthenticated: false });
          return null;
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => SecureStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          console.log('[Zustand] Hydrated auth store:', state);
        }
      },
    },
  ),
);

export default useAuthStore;
