import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../RootStackParamList';
import CameraTest from '../../../screens/CameraTest';
import ProfileScreen from '../../../screens/Profile';
import { useTheme } from '../../../stores/ThemeContext';
import { View } from 'react-native';
import { HeaderRight } from '../../../components/atoms/HeaderRight';
import styles from '../../../components/atoms/HeaderRight/styles';
import { globalFonts } from '../../../styles/globalStyles';

const ProfileStack = createNativeStackNavigator<RootStackParamList>();

function ProfileNav() {
  const {theme, toggleTheme} = useTheme();
  return (
    <ProfileStack.Navigator initialRouteName="Profile"screenOptions={{
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
              fontFamily: globalFonts.secondary_bold,
              fontSize: 26,
              color: theme === 'light' ? '#000000' : '#ffffff',
            },
          }}>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen
        name="Camera"
        component={CameraTest}
        options={{headerShown: false}}
        initialParams={{onPhotoTaken: () => {}}}
      />
    </ProfileStack.Navigator>
  );
}

export default ProfileNav;
