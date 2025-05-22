import api from './api';

export const signup = async (formData: FormData) => {
  const response = await api.post('api/auth/signup', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const verifyOtp = async (email: string, otp: string) => {
  const response = await api.post('api/auth/verify-otp', { email, otp });
  return response.data;
};

export const login = async (email: string, password: string) => {
  const response = await api.post('api/auth/login', { email, password });
  const token = response.data.data.accessToken;
  console.log('Access Token:', token);
  return (response.data.data);
};

export const refreshTokenreq = async (refreshToken: string) => {
  const response = await api.post('api/auth/refresh-token', { refreshToken });
  return response.data;
};
