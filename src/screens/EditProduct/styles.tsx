import { StyleSheet } from 'react-native';
import { globalColors } from '../../styles/globalStyles';

const getDynamicStyles = (theme: 'light' | 'dark') => {
  const isDark = theme === 'dark';

  return StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: isDark ? globalColors.dark_background : globalColors.light_background,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Arial',
    marginBottom: 16,
    color: isDark ? globalColors.dark_text : globalColors.light_text,
    textShadowColor: isDark ? globalColors.dark_shadow : globalColors.light_shadow,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  container: {
    flex: 1,
    backgroundColor: isDark ? globalColors.dark_background : globalColors.light_background,
    padding: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: isDark ? globalColors.dark_text : globalColors.light_text,
  },
  input: {
    borderWidth: 1,
    borderColor: isDark ? globalColors.dark_red : globalColors.light_blue,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: isDark ? globalColors.dark_background : globalColors.light_background,
    color: isDark ? globalColors.dark_text : globalColors.light_text,
  },
  saveButton: {
    backgroundColor: isDark ? globalColors.dark_red : globalColors.light_blue,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: globalColors.dark_text,
  },
});
};

export default getDynamicStyles;
