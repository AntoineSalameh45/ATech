import {Dimensions, StyleSheet} from 'react-native';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const BASE_WIDTH = 375;

const scale = (size: number) => (SCREEN_WIDTH / BASE_WIDTH) * size;

const getDynamicStyles = (theme: 'light' | 'dark') => {
  const isLight = theme === 'light';
  const shimmerColor = isLight ? '#E0E0E0' : '#444';

  return StyleSheet.create({
    skeletonContainer: {
      width: '48%',
      marginBottom: scale(16),
      marginHorizontal: scale(4),
      backgroundColor: isLight ? '#FFFFFF' : '#2D2D2D',
      borderRadius: scale(12),
      padding: scale(10),
      shadowColor: shimmerColor,
      shadowOpacity: 0.1,
      shadowRadius: scale(4),
      elevation: 2,
    },
    skeletonItem: {
      backgroundColor: shimmerColor,
      borderRadius: scale(4),
    },
    skeletonImage: {
      width: '100%',
      aspectRatio: 1,
      marginBottom: scale(8),
    },
    skeletonText: {
      width: '70%',
      height: scale(16),
      marginBottom: scale(6),
    },
    skeletonPrice: {
      width: '50%',
      height: scale(14),
    },
  });
};

export default getDynamicStyles;
