import React, {useEffect} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ThemeProvider} from './src/stores/ThemeContext';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './src/navigation/RootStack';
import BootSplash from 'react-native-bootsplash';
import {OneSignal, LogLevel} from 'react-native-onesignal';
import { ONE_SIGNAL_APPID } from '@env';

const linking = {
  prefixes: ['atech://'],
  config: {
    screens: {
      HomePage: {
        path: 'home',
        screens: {
          ProductScreen: {
            path: 'products',
            screens: {
              Details: 'details/:id',
            },
          },
        },
      },
      Cart: 'cart',
    },
  },
};

const App = () => {
  useEffect(() => {
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);
    OneSignal.initialize(ONE_SIGNAL_APPID);

    OneSignal.Notifications.requestPermission(false);

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
