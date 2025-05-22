import React, {useEffect} from 'react';
import useAuthStore from '../stores/AuthStore/AuthStore';
import UnauthStack from './stacks/UnauthStack';
import MainNavigator from './navigators/MainNavigator';
import { isTokenExpired } from '../utils/token';

const RootStack = () => {
  const {isAuthenticated, setAuthenticated, accessToken, refreshAccessToken} =
    useAuthStore();

  useEffect(() => {
    const verifyToken = async () => {
      if (accessToken) {
        if (isTokenExpired(accessToken)) {
          const newAccessToken = await refreshAccessToken();
          setAuthenticated(!!newAccessToken);
        } else {
          setAuthenticated(true);
        }
      } else {
        setAuthenticated(false);
      }
    };

    verifyToken();
  }, [accessToken, setAuthenticated, refreshAccessToken]);

  return isAuthenticated ? <MainNavigator /> : <UnauthStack />;
};

export default RootStack;
