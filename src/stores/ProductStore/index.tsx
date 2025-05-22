import { create } from 'zustand';
import { Pagination, Product } from '../../services/products.type';
import { fetchProducts } from '../../services/products';

interface iProductsState {
  products: Product[];
  pagination: Pagination | null;
  loading: boolean;
  error: string | null;
  fetchProducts: (page?: number, limit?: number) => Promise<void>;
}

export const useProductsStore = create<iProductsState>((set) => ({
  products: [],
  pagination: null,
  loading: false,
  error: null,

  fetchProducts: async (page = 1, limit = 10) => {
    set({ loading: true, error: null });

    try {
      const { data, pagination } = await fetchProducts(page, limit);
      set({ products: data, pagination, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
}));
