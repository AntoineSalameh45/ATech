import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AuthStack from '../../stacks/AuthStack';
import MyTabBar from '../../../components/organisims/CustomTabBar';
import {HomeIcon, AddIcon, CartIcon, ProfileIcon} from '../../../assets/svg';
import {View} from 'react-native';
import styles from '../../../components/atoms/HeaderRight/styles';
import {iThemeContextType, useTheme} from '../../../stores/ThemeContext';
import {HeaderRight} from '../../../components/atoms/HeaderRight';
import ProfileStack from '../../stacks/ProfileStack';
import CartScreen from '../../../screens/Cart';
import UploadProductScreen from '../../../screens/UploadScreen';
import {globalFonts} from '../../../styles/globalStyles';

const Tab = createBottomTabNavigator();

const CustomHeaderRight = ({theme, toggleTheme}: iThemeContextType) => (
  <View style={styles.headerRightContainer}>
    <HeaderRight theme={theme} toggleTheme={toggleTheme} />
  </View>
);

function MainNavigator() {
  const icons = [HomeIcon, AddIcon, CartIcon, ProfileIcon];
  const {theme, toggleTheme} = useTheme();

  return (
    <Tab.Navigator
      tabBar={props => <MyTabBar icons={icons} {...props} />}
      screenOptions={{
        headerRight: () => (
          <CustomHeaderRight theme={theme} toggleTheme={toggleTheme} />
        ),
        headerStyle: {
          backgroundColor: theme === 'light' ? '#ffffff' : '#333333',
        },
        headerTintColor: theme === 'light' ? '#000000' : '#ffffff',
        headerTitleStyle: {
          fontFamily: globalFonts.secondary_bold,
          fontSize: 22,
          color: theme === 'light' ? '#000000' : '#ffffff',
        },
      }}>
      <Tab.Screen
        name="HomePage"
        component={AuthStack}
        options={{headerShown: false}}
      />
      <Tab.Screen name="Upload" component={UploadProductScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen
        name="ProfileNavigator"
        component={ProfileStack}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}

export default MainNavigator;
