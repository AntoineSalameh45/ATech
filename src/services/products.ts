import axios from 'axios';
import api from './api';
import { ProductsApiResponse } from './products.type';

export const fetchProducts = async (
  page: number = 1,
  limit: number = 10
): Promise<ProductsApiResponse> => {
  try {
    const response = await api.get<ProductsApiResponse>('api/products', {
      params: { page, limit },
    });

    if (!response.data.success) {
      throw new Error('Failed to fetch products');
    }

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching products:', error.message);
      throw new Error(
        error.response?.data?.message || 'An unexpected error occurred'
      );
    } else {
      console.error('Unknown error:', error);
      throw new Error('An unknown error occurred');
    }
  }
};
