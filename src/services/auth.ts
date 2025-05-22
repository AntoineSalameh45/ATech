import api from './api';

export const signup = async (formData: FormData) => {
  const response = await api.post('api/auth/signup', formData, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
  return response.data;
};

export const verifyOtp = async (email: string, otp: string) => {
  const response = await api.post('api/auth/verify-otp', {email, otp});
  return response.data;
};

export const login = async (email: string, password: string) => {
  const response = await api.post('api/auth/login', {email, password});
  return response.data.data;
};
export const refreshTokenreq = async (refreshToken: string) => {
  try {
    console.log(
      '[refreshTokenreq] Sending refresh request with token:',
      refreshToken,
    );

    const response = await api.post('api/auth/refresh-token', {refreshToken});

    console.log('[refreshTokenreq] Full response received:', response);

    const {success, data} = response.data;

    if (!success || !data || !data.accessToken || !data.refreshToken) {
      console.error(
        '[refreshTokenreq] Invalid response structure:',
        response.data,
      );
      throw new Error('Invalid refresh token response structure.');
    }

    console.log('[refreshTokenreq] Tokens refreshed successfully:', data);
    return data;
  } catch (error: any) {
    if (error.response) {
      console.error('[refreshTokenreq] API error response:', error.response);
      console.error('[refreshTokenreq] API error data:', error.response.data);
    } else if (error.request) {
      console.error('[refreshTokenreq] No response received:', error.request);
    } else {
      console.error('[refreshTokenreq] Unexpected error:', error.message);
    }
    throw error;
  }
};
