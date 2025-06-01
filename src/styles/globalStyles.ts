import {Dimensions, StyleSheet} from 'react-native';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const BASE_WIDTH = 375;

const scale = (size: number) => (SCREEN_WIDTH / BASE_WIDTH) * size;

export const globalColors = {
  light_blue: '#87CEEB',
  dark_red: '#FF6347',
  light_background: '#FFFFFF',
  dark_background: '#1C1C1E',
  light_text: '#000000',
  dark_text: '#FFFFFF',
  light_secondary_text: '#333333',
  dark_secondary_text: '#DDDDDD',
  light_shadow: '#000000',
  dark_shadow: '#FFFFFF',
};

export const globalFonts = {
  primary_font: 'Rancho-Regular',
  secondary_font: 'JosefinSans-Regular',
  secondary_bold: 'JosefinSans-Bold',
  title_font: 'JosefinSans-Bold',
  price_tag: 'JosefinSans-Regular',
};

export const globalStyles = (theme: 'light' | 'dark') => {
  const isLight = theme === 'light';

  return StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isLight
        ? globalColors.light_background
        : globalColors.dark_background,
    },
    errorText: {
      color: globalColors.dark_red,
      fontSize: scale(16),
      fontWeight: 'bold',
      textAlign: 'center',
      paddingHorizontal: scale(20),
    },
    retryButton: {
      marginTop: scale(16),
      padding: scale(12),
      backgroundColor: isLight
        ? globalColors.light_blue
        : globalColors.dark_red,
      borderRadius: scale(8),
      alignItems: 'center',
    },
    retryButtonText: {
      color: globalColors.dark_text,
      fontSize: scale(16),
      fontWeight: 'bold',
    },
    appContainer: {
      flex: 1,
      backgroundColor: theme === 'light' ? '#ffffff' : '#333333',
    },
  });
};
