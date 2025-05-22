import {StyleSheet} from 'react-native';
import {globalColors, globalFonts} from '../../../styles/globalStyles';

export const getDynamicStyles = (theme: 'light' | 'dark') => {
  const isLight = theme === 'light';

  return StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      width: '80%',
      backgroundColor: isLight
        ? globalColors.light_background
        : globalColors.dark_background,
      borderRadius: 16,
      padding: 20,
      shadowColor: isLight ? globalColors.light_shadow : globalColors.dark_shadow,
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 10,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: isLight ? globalColors.light_text : globalColors.dark_text,
      fontFamily: globalFonts.secondary_bold,
    },
    message: {
      fontSize: 16,
      marginBottom: 20,
      color: isLight
        ? globalColors.light_secondary_text
        : globalColors.dark_secondary_text,
      fontFamily: globalFonts.secondary_font,
    },
    buttonContainer: {
      flexDirection: 'column',
      gap: 10,
      alignItems: 'center',
    },
    button: {
      paddingVertical: 10,
      paddingHorizontal: 15,
      backgroundColor: isLight ? globalColors.light_blue : globalColors.dark_red,
      borderRadius: 8,
      minWidth: 120,
    },
    buttonText: {
      color: globalColors.dark_text,
      fontSize: 16,
      textAlign: 'center',
      fontFamily: globalFonts.secondary_bold,
    },
  });
};
