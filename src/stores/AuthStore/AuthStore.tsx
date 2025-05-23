import {create} from 'zustand';
import {createJSONStorage, persist, StateStorage} from 'zustand/middleware';
import RNSecureStorage, {ACCESSIBLE} from 'rn-secure-storage';
import {refreshTokenreq} from '../../services/auth';

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
    await RNSecureStorage.setItem(name, value, {
      accessible: ACCESSIBLE.WHEN_UNLOCKED,
    });
  },

  getItem: async name => {
    try {
      const value = await RNSecureStorage.getItem(name);
      return value;
    } catch (error: any) {
      if (
        error.message.includes('Value for') &&
        error.message.includes('does not exist')
      ) {
        return null;
      }
      console.error(
        `[SecureStorage] Unexpected error getting item ${name}:`,
        error,
      );
      throw error;
    }
  },

  removeItem: async name => {
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
        set({accessToken, refreshToken, isAuthenticated: !!accessToken});
      },

      clearTokens: () => {
        set({accessToken: null, refreshToken: null, isAuthenticated: false});
      },

      setAuthenticated: value => {
        set({isAuthenticated: value});
      },

      refreshAccessToken: async (): Promise<string | null> => {
        const refreshToken = get().refreshToken;

        if (!refreshToken) {
          console.error('[AuthStore] No refresh token available.');
          return null;
        }

        try {
          const response = await refreshTokenreq(refreshToken);

          const {accessToken, refreshToken: newRefreshToken} = response;

          if (!accessToken || !newRefreshToken) {
            throw new Error('Invalid token response structure.');
          }

          set({accessToken, refreshToken: newRefreshToken});
          return accessToken;
        } catch (error: any) {
          console.error('[AuthStore] Failed to refresh access token:', error);
          set({accessToken: null, refreshToken: null, isAuthenticated: false});
          return null;
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => SecureStorage),
      onRehydrateStorage: () => state => {
        if (state) {
          console.log('[Zustand] Hydrated auth store:', state);
        }
      },
    },
  ),
);

export default useAuthStore;
