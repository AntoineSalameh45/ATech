import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../RootStackParamList';
import Home from '../../../screens/Home';
import Details from '../../../screens/Details';
import {Button} from 'react-native';
import {useTheme} from '../../../stores/ThemeContext';

const MainStack = createNativeStackNavigator<RootStackParamList>();

function HeaderRight({
  theme,
  toggleTheme,
}: {
  theme: string;
  toggleTheme: () => void;
}) {
  return (
    <Button
      onPress={toggleTheme}
      title={theme === 'light' ? 'Dark Mode' : 'Light Mode'}
    />
  );
}

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
