import api from './api';

export const signup = async (
  formData: FormData,
): Promise<{success: boolean; data: {message: string}}> => {
  try {
    const response = await api.post('api/auth/signup', formData, {
      headers: {'Content-Type': 'multipart/form-data'},
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      const serverMessage =
        error.response.data?.message || 'Unknown server error';
      throw new Error(
        `Server responded with status ${error.response.status}: ${serverMessage}`,
      );
    }

    if (error instanceof Error) {
      throw new Error(error.message || 'Failed to sign up. Please try again.');
    }

    throw new Error('An unexpected error occurred during the signup process.');
  }
};

export const verifyOTP = async (data: {
  email: string;
  otp: string;
}): Promise<{
  success: boolean;
  data: {isEmailVerified: boolean; message: string};
}> => {
  try {
    const response = await api.post('api/auth/verify-otp', data);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        error.message || 'Failed to verify OTP. Please try again.',
      );
    }
    throw new Error('An unexpected error occurred.');
  }
};

export const resendOTP = async (data: {
  email: string;
}): Promise<{success: boolean; data: {message: string}}> => {
  try {
    const response = await api.post('api/auth/resend-verification-otp', data);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        error.message || 'Failed to resend OTP. Please try again.',
      );
    }
    throw new Error('An unexpected error occurred.');
  }
};

export const login = async (
  email: string,
  password: string,
): Promise<{accessToken: string; refreshToken: string}> => {
  try {
    const response = await api.post('api/auth/login', {email, password});
    return response.data.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        error.message || 'Login failed. Please check your credentials.',
      );
    }
    throw new Error('An unexpected error occurred.');
  }
};

export const refreshTokenreq = async (
  refreshToken: string,
): Promise<{accessToken: string; refreshToken: string}> => {
  try {
    const response = await api.post('api/auth/refresh-token', {refreshToken});
    const {success, data} = response.data;
    if (!success || !data?.accessToken || !data?.refreshToken) {
      throw new Error('Invalid refresh token response structure.');
    }
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        error.message || 'Failed to refresh token. Please try again.',
      );
    }
    throw new Error('An unexpected error occurred.');
  }
};
