import {StyleSheet, Dimensions} from 'react-native';
import {globalColors} from '../../styles/globalStyles';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const BASE_WIDTH = 375;

const scale = (size: number) => (SCREEN_WIDTH / BASE_WIDTH) * size;

export const getDynamicStyles = (theme: 'light' | 'dark') => {
  const isLight = theme === 'light';

  const primaryColor = isLight
    ? globalColors.light_blue
    : globalColors.dark_red;
  const dangerColor = isLight ? '#dc3545' : '#ff6b6b';
  const background = isLight ? '#fff' : '#121212';
  const inputBackground = isLight ? '#f9f9f9' : '#222';
  const borderColor = isLight ? '#ccc' : '#444';
  const textColor = isLight ? globalColors.light_text : globalColors.dark_text;

  return StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: scale(16),
      backgroundColor: background,
      paddingBottom: scale(75),
    },
    label: {
      fontSize: scale(14),
      fontWeight: '600',
      color: textColor,
      marginBottom: scale(4),
    },
    input: {
      backgroundColor: inputBackground,
      borderWidth: 1,
      borderColor: borderColor,
      borderRadius: scale(6),
      paddingHorizontal: scale(12),
      paddingVertical: scale(8),
      color: textColor,
      marginBottom: scale(12),
      fontSize: scale(16),
      textAlignVertical: 'top',
    },
    errorText: {
      color: dangerColor,
      marginBottom: scale(8),
      fontSize: scale(12),
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: scale(20),
    },
    button: {
      flex: 1,
      paddingVertical: scale(12),
      borderRadius: scale(6),
      alignItems: 'center',
    },
    buttonPrimary: {
      backgroundColor: primaryColor,
      marginRight: scale(8),
    },
    buttonSecondary: {
      backgroundColor: '#555',
      marginLeft: scale(8),
    },
    buttonDisabled: {
      backgroundColor: '#888',
    },
    buttonText: {
      color: '#fff',
      fontWeight: '700',
      fontSize: scale(16),
    },
    uploadButton: {
      backgroundColor: primaryColor,
      paddingVertical: scale(14),
      borderRadius: scale(6),
      alignItems: 'center',
    },
    mapButtons: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      position: 'absolute',
      bottom: scale(20),
      left: scale(16),
      right: scale(16),
    },
    saveButton: {
      flex: 1,
      backgroundColor: primaryColor,
      paddingVertical: scale(12),
      borderRadius: scale(6),
      alignItems: 'center',
      marginRight: scale(8),
    },
    saveButtoText: {
      color: '#fff',
    },
    cancelButton: {
      flex: 1,
      backgroundColor: dangerColor,
      paddingVertical: scale(12),
      borderRadius: scale(6),
      alignItems: 'center',
      marginLeft: scale(8),
    },
  });
};
