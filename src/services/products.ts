import api from './api';

export const fetchProducts = async (
  page: number,
  limit: number,
  query?: string,
): Promise<any> => {
  const endpoint = query ? '/api/products/search' : '/api/products';
  const params = { page, limit, ...(query ? { query } : {}) };

  try {
    const response = await api.get(endpoint, { params });
    console.log('Full API Response:', response);
    console.log('Response Data:', response.data);
    if (!response.data) {
      throw new Error('Invalid API response: "data" property is missing.');
    }
    return response.data;
  } catch (error: any) {
    console.error('Error in fetchProducts:', error);
    if (error.response) {
      console.error('Error Response:', error.response);
      throw new Error(error.response.data?.message || 'Unexpected server error');
    }
    throw new Error(error.message || 'Unknown error occurred');
  }
};
