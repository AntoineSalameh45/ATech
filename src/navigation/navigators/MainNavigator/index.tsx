import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CameraTest from '../../../screens/CameraTest';
import AuthStack from '../../stacks/AuthStack';
import SignUp from '../../../screens/SignUp';
import MyTabBar from '../../../components/organisims/CustomTabBar';
import {HomeIcon, AddIcon, CartIcon, ProfileIcon} from '../../../assets/svg';

const Tab = createBottomTabNavigator();

function MainNavigator() {
  const icons = [HomeIcon, AddIcon, CartIcon, ProfileIcon];
  return (
    <Tab.Navigator
      tabBar={props => <MyTabBar icons={icons} {...props} />}
      screenOptions={{
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name="HomePage"
        component={AuthStack}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Upload"
        component={CameraTest}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Camera"
        component={CameraTest}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}
export default MainNavigator;
