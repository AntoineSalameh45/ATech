import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { PersistStorage } from 'zustand/middleware';

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  cartItems: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}
const asyncStoragePersist: PersistStorage<CartState> = {
  getItem: async (name) => {
    const value = await AsyncStorage.getItem(name);
    return value ? JSON.parse(value) : null;
  },
  setItem: async (name, value) => {
    await AsyncStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: async (name) => {
    await AsyncStorage.removeItem(name);
  },
};

const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cartItems: [],
      addItem: (item) =>
        set((state) => {
          const existingItem = state.cartItems.find(
            (cartItem) =>
              cartItem._id === item._id && cartItem.name === item.name,
          );

          if (existingItem) {
            return {
              cartItems: state.cartItems.map((cartItem) =>
                cartItem._id === item._id && cartItem.name === item.name
                  ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                  : cartItem,
              ),
            };
          }

          return { cartItems: [...state.cartItems, item] };
        }),
      removeItem: (id) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item._id !== id),
        })),
      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: 'cart-storage',
      storage: asyncStoragePersist,
    },
  ),
);

export default useCartStore;
