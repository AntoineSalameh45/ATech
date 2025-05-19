import React from 'react';
import { useAuth } from '../stores/AuthContext';
import UnauthStack from './stacks/UnauthStack';
import MainNavigator from './navigators/MainNavigator';

const RootStack = () => {
  const {isAuthenticated} = useAuth();
  return isAuthenticated ? <MainNavigator /> : <UnauthStack />;
};

export default RootStack;
