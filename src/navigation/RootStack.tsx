import React from 'react';
import { useAuth } from '../stores/AuthContext';
import AuthStack from './stacks/AuthStack';
import UnauthStack from './stacks/UnauthStack';

const RootStack = () => {
  const {isAuthenticated} = useAuth();
  return isAuthenticated ? <AuthStack /> : <UnauthStack />;
};

export default RootStack;
