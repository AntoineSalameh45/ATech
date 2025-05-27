import React, {useEffect} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ThemeProvider} from './src/stores/ThemeContext';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './src/navigation/RootStack';
import BootSplash from 'react-native-bootsplash';

const App = () => {
  useEffect(() => {
    BootSplash.hide({fade: true}).then(() => {
      console.log('BootSplash has been hidden successfully');
    });
  }, []);

  return (
    <GestureHandlerRootView>
      <ThemeProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <RootStack />
          </NavigationContainer>
        </SafeAreaProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};

export default App;
