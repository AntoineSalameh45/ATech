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
  error => {
    if (error.response?.status === 401) {
      console.error('Unauthorized - Token expired or invalid.');
    }
    return Promise.reject(error);
  },
);

export default api;
