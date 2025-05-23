import {StyleSheet, Dimensions, PixelRatio} from 'react-native';
import {globalColors, globalFonts} from '../../styles/globalStyles';

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

    sortOptionsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: 10,
      paddingHorizontal: 16,
    },
    sortLabel: {
      fontSize: 16,
      color: isLight ? globalColors.light_text : globalColors.dark_text,
      fontWeight: 'bold',
    },
    sortButtonsContainer: {
      flexDirection: 'row',
      gap: 10,
      paddingHorizontal: 8,
    },
    sortButtons: {
      flexDirection: 'row',
      gap: 10,
    },
    sortButton: {
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: isLight ? globalColors.light_blue : globalColors.dark_red,
      backgroundColor: isLight
        ? globalColors.light_background
        : globalColors.dark_background,
    },
    selectedSortButton: {
      borderColor: 'transparent',
      backgroundColor: isLight
        ? globalColors.light_blue
        : globalColors.dark_red,
    },
    sortButtonText: {
      fontSize: 14,
      color: isLight ? globalColors.light_text : globalColors.dark_text,
      fontWeight: '600',
    },
    selectedSortButtonText: {
      color: isLight ? globalColors.light_text : globalColors.dark_text,
    },
  });
};
