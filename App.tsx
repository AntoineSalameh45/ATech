import React, {useEffect} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ThemeProvider} from './src/stores/ThemeContext';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './src/navigation/RootStack';
import BootSplash from 'react-native-bootsplash';

const linking = {
  prefixes: ['atech://'],
  config: {
    initialRouteName: 'Home' as const,
    screens: {
      Home: 'home',
      ProductScreen: {
        path: 'products',
        screens: {
          Details: 'details/:id',
        },
      },
    },
  },
};


const App = () => {
  useEffect(() => {
    BootSplash.hide({fade: true}).then(() => {});
  }, []);

  return (
    <GestureHandlerRootView>
      <ThemeProvider>
        <SafeAreaProvider>
          <NavigationContainer linking={linking}>
            <RootStack />
          </NavigationContainer>
        </SafeAreaProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};

export default App;
