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
    justifyContent: 'center',
    padding: 20,
    backgroundColor: isDark ? globalColors.dark_background : globalColors.light_background,
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    textAlign: 'center',
    color: isDark ? globalColors.dark_text : globalColors.light_text,
    fontFamily: 'Rancho-Regular',
  },
  description: {
    fontSize: 12,
    fontWeight: 'normal',
    marginBottom: 20,
    textAlign: 'center',
    color: isDark ? globalColors.dark_text : globalColors.light_text,
    fontFamily: globalFonts.secondary_font,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 8,
    color: isDark ? globalColors.dark_text : globalColors.light_text,
    backgroundColor: isDark ? globalColors.dark_background : globalColors.light_background,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: isDark ? globalColors.dark_red : globalColors.light_blue,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: globalFonts.secondary_bold,
  },
  signupTextContainer: {
    marginTop: 20,
  },
  signupText: {
    fontSize: 11,
    color: isDark ? globalColors.dark_text : globalColors.light_text,
    textAlign: 'center',
    fontFamily: globalFonts.secondary_font,
  },
  signupLink: {
    color: isDark ? globalColors.dark_red : globalColors.light_blue,
  },
  disabledButton: {
    opacity: 0.6,
  },
});
};

export default getDynamicStyles;
