import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../RootStackParamList';
import {useTheme} from '../../../stores/ThemeContext';
import {View} from 'react-native';
import {HeaderRight} from '../../../components/atoms/HeaderRight';
import styles from '../../../components/atoms/HeaderRight/styles';
import {globalFonts} from '../../../styles/globalStyles';
import Details from '../../../screens/Details';
import EditProduct from '../../../screens/EditProduct';

const ProductStack = createNativeStackNavigator<RootStackParamList>();

function ProductNav() {
  const {theme, toggleTheme} = useTheme();
  return (
    <ProductStack.Navigator
      initialRouteName="Details"
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
          fontFamily: globalFonts.secondary_bold,
          fontSize: 26,
          color: theme === 'light' ? '#000000' : '#ffffff',
        },
      }}>
      <ProductStack.Screen name="Details" component={Details} />
      <ProductStack.Screen
        name="EditProduct"
        component={EditProduct}
        options={{headerShown: false}}
      />
    </ProductStack.Navigator>
  );
}

export default ProductNav;
