import {create} from 'zustand';
import {createJSONStorage, persist, StateStorage} from 'zustand/middleware';
import RNSecureStorage, {ACCESSIBLE} from 'rn-secure-storage';

export interface iAuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearTokens: () => void;
  setAuthenticated: (value: boolean) => void;
}

const SecureStorage: StateStorage = {
  setItem: async (name, value) => {
    console.log(`[SecureStorage] Setting item: ${name}`);
    await RNSecureStorage.setItem(name, value, {
      accessible: ACCESSIBLE.WHEN_UNLOCKED,
    });
    console.log(`[SecureStorage] Successfully set item: ${name}`);
  },

  getItem: async name => {
    try {
      const value = await RNSecureStorage.getItem(name);
      return value;
    } catch (error) {
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

  removeItem: async name => {
    await RNSecureStorage.removeItem(name);
  },
};

const useAuthStore = create<iAuthState>()(
  persist(
    set => ({
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
