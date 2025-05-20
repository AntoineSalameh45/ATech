import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../RootStackParamList';
import Home from '../../../screens/Home';
import Details from '../../../screens/Details';
import {useTheme} from '../../../stores/ThemeContext';
import {HeaderRight} from '../../../components/atoms/HeaderRight';
import styles from '../../../components/atoms/HeaderRight/styles';
import { View } from 'react-native';
import CameraTest from '../../../screens/CameraTest';

const MainStack = createNativeStackNavigator<RootStackParamList>();

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
        component={Home}
        options={{
          title: 'ATech',
        }}
      />
      <MainStack.Screen
        name="Details"
        component={Details}
        options={({route}) => ({
          title: route.params?.title || 'Details',
          headerTitleStyle: {
            fontFamily: 'Roboto',
            fontSize: 22,
            color: theme === 'light' ? '#000000' : '#ffffff',
          },
        })}
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
