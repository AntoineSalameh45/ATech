import {Dimensions, StyleSheet} from 'react-native';
import { globalColors } from '../../../styles/globalStyles';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const BASE_WIDTH = 375;

const scale = (size: number) => (SCREEN_WIDTH / BASE_WIDTH) * size;

export const getDynamicStyles = (theme: 'light' | 'dark') => {
  const isLight = theme === 'light';
  const primaryColor = isLight
    ? globalColors.light_blue
    : globalColors.dark_red;
  const dangerColor = '#DC3545';
  return StyleSheet.create({
    selectedImagesText: {
      fontSize: scale(14),
      fontWeight: '600',
      color: isLight ? '#000' : '#fff',
      marginBottom: scale(4),
    },
    imagesContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: scale(16),
    },
    imageWrapper: {
      position: 'relative',
      marginBottom: 8,
    },
    image: {
      width: scale(80),
      height: scale(80),
      marginRight: scale(8),
      marginBottom: scale(8),
      borderRadius: scale(6),
    },
    removeButton: {
      position: 'absolute',
      top: -5,
      right: -5,
      backgroundColor: dangerColor,
      padding: 4,
      borderRadius: 15,
      zIndex: 1,
    },
    removeButtonText: {
      color: 'white',
      fontSize: 12,
      fontWeight: 'bold',
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
});
};
