import {StyleSheet, Dimensions, PixelRatio} from 'react-native';
import { globalStyles } from '../../styles/globalStyles';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const BASE_WIDTH = 375;

const scale = (size: number) => (SCREEN_WIDTH / BASE_WIDTH) * size;

export const getDynamicStyles = (theme: 'light' | 'dark') => {
  const isLight = theme === 'light';
  const primaryColor = isLight ? '#007BFF' : '#FF4500';
  const glowColor = isLight ? '#87CEEB' : '#FF6347';

  return StyleSheet.create({
    viewContainer: {
      flex: 1,
      padding: scale(16),
      backgroundColor: isLight ? '#F0F8FF' : '#1C1C1E',
    },
    text: {
      fontSize: scale(18),
      fontWeight: 'bold',
      marginBottom: scale(16),
      color: isLight ? '#000' : '#fff',
    },
    listContainer: {
      paddingVertical: scale(8),
    },
    productContainer: {
      flexDirection: 'row',
      marginBottom: scale(16),
      backgroundColor: isLight ? '#F9FAFB' : '#2D2D2D',
      borderRadius: scale(8),
      padding: scale(12),
      shadowColor: glowColor,
      shadowOpacity: 0.5,
      shadowRadius: scale(8),
      elevation: 5,
    },
    productImage: {
      width: scale(100),
      height: scale(100),
      borderRadius: scale(8),
      marginRight: scale(8),
      borderWidth: PixelRatio.getPixelSizeForLayoutSize(0.5),
      borderColor: isLight ? primaryColor : '#FF6347',
    },
    productDetails: {
      flex: 1,
    },
    productTitle: {
      fontSize: scale(16),
      marginBottom: scale(4),
      color: isLight ? '#000' : '#fff',
      fontFamily: globalStyles.title_font,
    },
    productDescription: {
      fontSize: scale(14),
      color: isLight ? '#555' : '#ccc',
      marginBottom: scale(8),
      fontFamily: globalStyles.primary_font,
    },
    productPrice: {
      fontSize: scale(16),
      fontFamily: globalStyles.price_tag,
      color: primaryColor,
    },
    clickForMore: {
      color: primaryColor,
      fontWeight: 'bold',
    },
    button: {
      backgroundColor: primaryColor,
      paddingVertical: scale(10),
      paddingHorizontal: scale(20),
      borderRadius: scale(20),
      shadowColor: glowColor,
      shadowOpacity: 0.7,
      shadowRadius: scale(15),
      elevation: 8,
    },
    buttonText: {
      fontSize: scale(16),
      color: '#fff',
      fontWeight: 'bold',
    },
  });
};
