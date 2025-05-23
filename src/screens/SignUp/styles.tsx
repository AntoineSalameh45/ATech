import {StyleSheet} from 'react-native';
import {globalColors, globalFonts} from '../../styles/globalStyles';

const getDynamicStyles = (theme: 'light' | 'dark') => {
  const isDark = theme === 'dark';

  return StyleSheet.create({
    keyContainer: {
      flex: 1,
    },
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: isDark ? globalColors.dark_background : globalColors.light_background,
    },
    scrollViewContainer: {
      flexGrow: 1,
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
      textAlign: 'center',
      color: isDark ? globalColors.dark_text : globalColors.light_text,
      fontFamily: globalFonts.primary_font,
    },
    label: {
      fontSize: 16,
      marginBottom: 5,
      color: isDark ? globalColors.dark_text : globalColors.light_text,
      fontFamily: globalFonts.primary_font,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginBottom: 15,
      fontSize: 16,
      color: isDark ? globalColors.dark_text : globalColors.light_text,
      backgroundColor: isDark ? globalColors.dark_background : globalColors.light_background,
    },
    errorInput: {
      borderColor: '#f00',
    },
    errorText: {
      color: '#f00',
      fontSize: 12,
      marginBottom: 10,
    },
    button: {
      backgroundColor: isDark ? globalColors.dark_red : globalColors.light_blue,
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 10,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontFamily: globalFonts.secondary_bold,
    },
    signupTextContainer: {
      marginTop: 20,
    },
    signupText: {
      fontSize: 12,
      color: isDark ? globalColors.dark_text : globalColors.light_text,
      textAlign: 'center',
      fontFamily: globalFonts.secondary_font,
    },
    signupLink: {
      color: isDark ? globalColors.dark_red : globalColors.light_blue,
    },
  });
};

export default getDynamicStyles;
