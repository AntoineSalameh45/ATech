import axios from 'axios';
import { BASE_URL } from '@env';
import { AuthStore } from '../stores/AuthStore';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  config => {
    const token = AuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.log('No access token found, continuing without auth header.');
    }
    return config;
  },
  error => Promise.reject(error),
);

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      console.error('Unauthorized - Token expired or invalid.');

      originalRequest._retry = true;

      try {
        const refreshAccessToken = AuthStore.getState().refreshAccessToken;

        if (!refreshAccessToken) {
          console.error('No refresh logic found.');
          return Promise.reject(error);
        }

        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error('Failed to refresh token:', refreshError);
        AuthStore.getState().clearTokens();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
