import {StyleSheet, Dimensions, PixelRatio} from 'react-native';
import {globalFonts} from '../../styles/globalStyles';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const BASE_WIDTH = 375;

const scale = (size: number) => (SCREEN_WIDTH / BASE_WIDTH) * size;

export const getDynamicStyles = (theme: string) => {
  const isDark = theme === 'dark';
  const saberGlow = isDark ? '#FF6347' : '#87CEEB';
  const primaryColor = isDark ? '#FF4500' : '#007BFF';

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#121212' : '#F0F8FF',
      padding: scale(16),
    },
    header: {
      fontSize: scale(26),
      fontFamily: globalFonts.title_font,
      marginBottom: scale(20),
      color: isDark ? '#ffffff' : '#000000',
      textShadowColor: saberGlow,
      textShadowOffset: {width: 0, height: 0},
      textShadowRadius: scale(6),
    },
    productCard: {
      backgroundColor: isDark ? '#1c1c1c' : '#FFFFFF',
      borderRadius: scale(10),
      padding: scale(16),
      marginBottom: scale(12),
      flexDirection: 'row',
      alignItems: 'center',
      height: scale(80),
      borderWidth: PixelRatio.getPixelSizeForLayoutSize(1),
      borderColor: saberGlow,
      shadowColor: saberGlow,
      shadowOpacity: 0.3,
      shadowRadius: scale(8),
      elevation: 4,
    },
    productImage: {
      width: scale(60),
      height: scale(60),
      borderRadius: scale(8),
      marginRight: scale(12),
    },
    productDetails: {
      flex: 1,
    },
    productTitle: {
      fontSize: scale(18),
      fontFamily: globalFonts.secondary_font,
      color: isDark ? '#ffffff' : '#333333',
      marginBottom: scale(4),
    },
    productPrice: {
      fontSize: scale(16),
      color: isDark ? '#FF6347' : '#007BFF',
    },
    deleteButton: {
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'red',
      width: scale(70),
    },
    deleteButtonText: {
      color: '#ffffff',
      fontSize: scale(16),
      fontWeight: 'bold',
    },
    swipeableContainer: {
      marginVertical: scale(8),
      borderRadius: scale(8),
      overflow: 'hidden',
      height: scale(80),
    },
    quantityControl: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    quantityButton: {
      width: scale(30),
      height: scale(30),
      borderRadius: scale(6),
      backgroundColor: primaryColor,
      justifyContent: 'center',
      alignItems: 'center',
    },
    quantityButtonText: {
      fontSize: scale(16),
      fontWeight: 'bold',
      color: '#ffffff',
    },
    quantityValue: {
      marginHorizontal: scale(10),
      fontSize: scale(16),
      color: isDark ? '#ffffff' : '#333333',
    },
    totalContainer: {
      marginTop: scale(20),
      padding: scale(16),
      backgroundColor: isDark ? '#1c1c1c' : '#FFFFFF',
      borderRadius: scale(10),
      borderWidth: PixelRatio.getPixelSizeForLayoutSize(1),
      borderColor: saberGlow,
      shadowColor: saberGlow,
      shadowOpacity: 0.2,
      shadowRadius: scale(8),
      elevation: 3,
    },
    totalText: {
      fontSize: scale(20),
      fontFamily: globalFonts.price_tag,
      color: primaryColor,
    },
    checkoutButton: {
      marginTop: scale(20),
      paddingVertical: scale(14),
      backgroundColor: primaryColor,
      borderRadius: scale(12),
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: saberGlow,
      shadowOpacity: 0.5,
      shadowRadius: scale(8),
      elevation: 5,
    },
    checkoutButtonText: {
      fontSize: scale(18),
      fontFamily: globalFonts.title_font,
      color: '#ffffff',
      textShadowColor: saberGlow,
      textShadowOffset: {width: 0, height: 0},
      textShadowRadius: scale(6),
    },
    emptyStateContainer: {
      flex: 0.7,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyStateText: {
      fontSize: scale(18),
      fontFamily: globalFonts.secondary_font,
      color: isDark ? '#B0B0B0' : '#555555',
    },
    heading: {
      fontSize: scale(22),
      fontFamily: globalFonts.title_font,
      color: isDark ? '#ffffff' : '#000000',
      marginBottom: scale(16),
    },
    emptyCart: {
      textAlign: 'center',
      fontSize: scale(16),
      color: isDark ? '#B0B0B0' : '#555555',
    },
    cartItem: {
      flexDirection: 'row',
      marginBottom: scale(12),
      alignItems: 'center',
    },
    itemImage: {
      width: scale(60),
      height: scale(60),
      borderRadius: scale(8),
    },
    itemDetails: {
      flex: 1,
      marginLeft: scale(12),
    },
    itemName: {
      fontSize: scale(16),
      fontWeight: '600',
      color: isDark ? '#ffffff' : '#333333',
    },
    itemPrice: {
      fontSize: scale(14),
      color: isDark ? '#FF6347' : '#007BFF',
    },
    itemQuantity: {
      fontSize: scale(14),
      color: isDark ? '#ffffff' : '#333333',
    },
    removeButton: {
      backgroundColor: 'transparent',
      borderRadius: scale(6),
      padding: scale(8),
    },
    removeButtonText: {
      fontSize: scale(14),
      color: '#ffffff',
    },
    totalAmount: {
      fontSize: scale(18),
      color: primaryColor,
    },
    clearCartButton: {
      marginVertical: 20,
      padding: 10,
      backgroundColor: '#ff6b6b',
      borderRadius: 10,
      alignItems: 'center',
    },
    clearCartButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
};
