import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../RootStackParamList';
import Home from '../../../screens/Home';
import Details from '../../../screens/Details';

const MainStack = createNativeStackNavigator<RootStackParamList>();

function AuthStack() {
  return (
    <MainStack.Navigator initialRouteName="Home">
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
