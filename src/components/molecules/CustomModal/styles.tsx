import {StyleSheet} from 'react-native';
import { globalStyles } from '../../../styles/globalStyles';

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
        ? globalStyles.colors.light_background
        : globalStyles.colors.dark_background,
      borderRadius: 16,
      padding: 20,
      shadowColor: isLight
        ? globalStyles.colors.light_shadow
        : globalStyles.colors.dark_shadow,
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 10,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: isLight ? globalStyles.colors.light_text : globalStyles.colors.dark_text,
      fontFamily: globalStyles.secondary_bold,
    },
    message: {
      fontSize: 16,
      marginBottom: 20,
      color: isLight
        ? globalStyles.colors.light_secondary_text
        : globalStyles.colors.dark_secondary_text,
      fontFamily: globalStyles.secondary_font,
    },
    buttonContainer: {
      flexDirection: 'column',
      gap: 10,
      alignItems: 'center',
    },
    button: {
      paddingVertical: 10,
      paddingHorizontal: 15,
      backgroundColor: isLight
        ? globalStyles.colors.light_blue
        : globalStyles.colors.dark_red,
      borderRadius: 8,
      minWidth: 120,
    },
    buttonText: {
      color: globalStyles.colors.dark_text,
      fontSize: 16,
      textAlign: 'center',
      fontFamily: globalStyles.secondary_bold,
    },
  });
};
