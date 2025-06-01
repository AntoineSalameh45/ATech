import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../../../screens/Home';
import {useTheme} from '../../../stores/ThemeContext';
import {HeaderRight} from '../../../components/atoms/HeaderRight';
import styles from '../../../components/atoms/HeaderRight/styles';
import {View} from 'react-native';
import CameraTest from '../../../screens/CameraTest';
import ProductNav from '../ProductStack';
import {Easing} from 'react-native-reanimated';

const MainStack = createStackNavigator();

function HeaderRightContainer({
  theme,
  toggleTheme,
}: {
  theme: string;
  toggleTheme: () => void;
}) {
  return (
    <View style={styles.headerRightContainer}>
      <HeaderRight theme={theme} toggleTheme={toggleTheme} />
    </View>
  );
}

function AuthStack() {
  const {theme, toggleTheme} = useTheme();

  return (
    <MainStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerRight: () => (
          <HeaderRightContainer theme={theme} toggleTheme={toggleTheme} />
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
        cardStyle: {
          backgroundColor: theme === 'light' ? '#ffffff' : '#333333', // Explicit background
        },
        cardStyleInterpolator: ({current, next, layouts}) => ({
          cardStyle: {
            transform: [
              {
                rotateY: current.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['-90deg', '0deg'],
                }),
              },
              {
                translateY: next
                  ? next.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, layouts.screen.height],
                    })
                  : 0,
              },
            ],
          },
        }),
        transitionSpec: {
          open: {
            animation: 'timing',
            config: {
              duration: 400,
              easing: Easing.inOut(Easing.quad),
            },
          },
          close: {
            animation: 'timing',
            config: {
              duration: 500,
              easing: Easing.inOut(Easing.quad),
            },
          },
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
        component={ProductNav}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name="Camera"
        component={CameraTest}
        options={{headerShown: false}}
        initialParams={{
          onPhotoTaken: () => {},
          onCancel: () => {},
        }}
      />
    </MainStack.Navigator>
  );
}

export default AuthStack;
