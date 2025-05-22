import {create} from 'zustand';

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

const useCartStore = create<CartState>(set => ({
  cartItems: [],
  addItem: item =>
    set(state => {
      const existingItem = state.cartItems.find(
        cartItem => cartItem._id === item._id && cartItem.name === item.name,
      );

      if (existingItem) {
        return {
          cartItems: state.cartItems.map(cartItem =>
            cartItem._id === item._id && cartItem.name === item.name
              ? {...cartItem, quantity: cartItem.quantity + item.quantity}
              : cartItem,
          ),
        };
      }

      return {cartItems: [...state.cartItems, item]};
    }),

  removeItem: id =>
    set(state => ({
      cartItems: state.cartItems.filter(item => item._id !== id),
    })),
  clearCart: () => set({cartItems: []}),
}));

export default useCartStore;
