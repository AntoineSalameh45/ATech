import {create} from 'zustand';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  cartItems: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
}

const useCartStore = create<CartState>(set => ({
  cartItems: [],
  addItem: item =>
    set(state => {
      const existingItem = state.cartItems.find(
        cartItem => cartItem.id === item.id && cartItem.name === item.name, // Add further checks if necessary
      );

      if (existingItem) {
        return {
          cartItems: state.cartItems.map(cartItem =>
            cartItem.id === item.id && cartItem.name === item.name
              ? {...cartItem, quantity: cartItem.quantity + item.quantity}
              : cartItem,
          ),
        };
      }

      return {cartItems: [...state.cartItems, item]};
    }),

  removeItem: id =>
    set(state => ({
      cartItems: state.cartItems.filter(item => item.id !== id),
    })),
  clearCart: () => set({cartItems: []}),
}));

export default useCartStore;
