import React, { useEffect } from 'react';
import useAuthStore from '../stores/AuthStore/AuthStore';
import UnauthStack from './stacks/UnauthStack';
import MainNavigator from './navigators/MainNavigator';

const RootStack = () => {
  const { isAuthenticated, setAuthenticated, accessToken } = useAuthStore();

  useEffect(() => {
    if (accessToken) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, [accessToken, setAuthenticated]);

  return isAuthenticated ? <MainNavigator /> : <UnauthStack />;
};

export default RootStack;
