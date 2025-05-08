import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../RootStackParamList';
import Login from '../../../screens/Login';
import SignUp from '../../../screens/SignUp';
import OTPScreen from '../../../screens/OneTimePass';

const ProtStack = createNativeStackNavigator<RootStackParamList>();

function UnauthStack() {
  return (
    <ProtStack.Navigator initialRouteName="Login">
      <ProtStack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <ProtStack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
      <ProtStack.Screen
        name="OTP"
        component={OTPScreen}
        options={{headerShown: false}}
      />
    </ProtStack.Navigator>
  );
}

export default UnauthStack;
