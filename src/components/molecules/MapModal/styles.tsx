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
    container: {
      flex: 1,
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
    saveButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: scale(14),
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
