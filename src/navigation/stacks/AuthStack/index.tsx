import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../RootStackParamList';
import Home from '../../../screens/Home';
import Details from '../../../screens/Details';
import {useTheme} from '../../../stores/ThemeContext';
import {HeaderRight} from '../../../components/atoms/HeaderRight';

const MainStack = createNativeStackNavigator<RootStackParamList>();

function AuthStack() {
  const {theme, toggleTheme} = useTheme();

  return (
    <MainStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerRight: () => (
          <HeaderRight theme={theme} toggleTheme={toggleTheme} />
        ),
        headerStyle: {
          backgroundColor: theme === 'light' ? '#ffffff' : '#333333',
        },
        headerTintColor: theme === 'light' ? '#000000' : '#ffffff',
        headerTitleStyle: {
          fontFamily: 'Rancho-Regular',
          fontSize: 28,
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
        })}
      />
    </MainStack.Navigator>
  );
}

export default AuthStack;
