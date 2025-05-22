import {StyleSheet, Dimensions, PixelRatio} from 'react-native';
import {globalFonts} from '../../styles/globalStyles';

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
      paddingBottom: scale(50),
      justifyContent: 'space-between',
    },
    productContainer: {
      width: '48%',
      marginBottom: scale(16),
      marginHorizontal: scale(4),
      backgroundColor: isLight ? '#FFFFFF' : '#2D2D2D',
      borderRadius: scale(12),
      padding: scale(10),
      shadowColor: glowColor,
      shadowOpacity: 0.3,
      shadowRadius: scale(6),
      elevation: 4,
    },
    productImage: {
      width: '100%',
      aspectRatio: 1,
      borderRadius: scale(8),
      marginBottom: scale(8),
      borderWidth: PixelRatio.getPixelSizeForLayoutSize(0.5),
      borderColor: isLight ? primaryColor : '#FF6347',
    },
    productDetails: {
      flex: 1,
      alignItems: 'flex-start',
    },
    productTitle: {
      fontSize: scale(14),
      marginBottom: scale(4),
      color: isLight ? '#000' : '#fff',
      fontFamily: globalFonts.title_font,
    },
    productPrice: {
      fontSize: scale(16),
      fontFamily: globalFonts.price_tag,
      color: primaryColor,
    },
  });
};
