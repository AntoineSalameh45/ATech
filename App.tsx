import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './src/navigation/stacks/AuthStack';
import UnauthStack from './src/navigation/stacks/UnauthStack';
import {AuthProvider, useAuth} from './src/stores/AuthContext';
import {ThemeProvider} from './src/stores/ThemeContext';

const RootNavigator = () => {
  const {isAuthenticated} = useAuth();
  return isAuthenticated ? <AuthStack /> : <UnauthStack />;
};

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
