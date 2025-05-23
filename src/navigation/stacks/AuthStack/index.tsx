import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../../../screens/Home';
import {useTheme} from '../../../stores/ThemeContext';
import {HeaderRight} from '../../../components/atoms/HeaderRight';
import styles from '../../../components/atoms/HeaderRight/styles';
import { View } from 'react-native';
import CameraTest from '../../../screens/CameraTest';
import { globalFonts } from '../../../styles/globalStyles';
import ProductStack from '../ProductStack';

const MainStack = createNativeStackNavigator();

function AuthStack() {
  const {theme, toggleTheme} = useTheme();

  return (
    <MainStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerRight: () => (
          <View style={styles.headerRightContainer}>
            <HeaderRight theme={theme} toggleTheme={toggleTheme} />
          </View>
        ),
        headerStyle: {
          backgroundColor: theme === 'light' ? '#ffffff' : '#333333',
        },
        headerTintColor: theme === 'light' ? '#000000' : '#ffffff',
        headerTitleStyle: {
          fontFamily: theme === 'light' ? 'Starjedi' : 'Starjhol',
          fontSize: 26,
          color: theme === 'light' ? '#000000' : '#ffffff',
        },
      }}>
      <MainStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'ATech',
        }}
      />
      <MainStack.Screen
        name="ProductScreen"
        component={ProductStack}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name="Camera"
        component={CameraTest}
        options={{headerShown: false}}
        initialParams={{ onPhotoTaken: () => {} }}
      />
    </MainStack.Navigator>
  );
}

export default AuthStack;
