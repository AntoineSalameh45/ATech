import { StyleSheet, Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BASE_WIDTH = 375;

const scale = (size: number) => (SCREEN_WIDTH / BASE_WIDTH) * size;

export const getDynamicStyles = (theme: string) => {
  const isDark = theme === 'dark';
  const saberGlow = isDark ? '#FF6347' : '#87CEEB';
  const primaryColor = isDark ? '#FF4500' : '#007BFF';

  return StyleSheet.create({
    container: {
      flex: 1,
      padding: scale(20),
      backgroundColor: isDark ? '#121212' : '#F0F8FF',
    },
    image: {
      width: '100%',
      height: scale(250),
      borderRadius: scale(10),
      marginBottom: scale(20),
      borderWidth: PixelRatio.getPixelSizeForLayoutSize(1.5), // Adjusted for high-DPI screens
      borderColor: saberGlow,
      shadowColor: saberGlow,
      shadowOpacity: 0.8,
      shadowRadius: scale(12),
      elevation: 8,
    },
    title: {
      fontSize: scale(26),
      fontWeight: 'bold',
      marginBottom: scale(10),
      color: isDark ? '#ffffff' : '#000000',
      textShadowColor: saberGlow,
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: scale(6),
    },
    description: {
      fontSize: scale(16),
      marginBottom: scale(20),
      lineHeight: scale(22),
      color: isDark ? '#e0e0e0' : '#333333',
      fontFamily: 'Rancho-Regular',
    },
    price: {
      fontSize: scale(20),
      fontWeight: 'bold',
      color: primaryColor,
      textShadowColor: saberGlow,
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: scale(4),
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: scale(20),
    },
    button: {
      backgroundColor: primaryColor,
      paddingVertical: scale(15),
      paddingHorizontal: scale(20),
      borderRadius: scale(8),
      shadowColor: saberGlow,
      shadowOpacity: 0.8,
      shadowRadius: scale(10),
      elevation: 10,
    },
    buttonText: {
      color: isDark ? '#000000' : '#ffffff',
      fontSize: scale(16),
      textShadowColor: saberGlow,
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: scale(4),
      fontFamily: 'Rancho-Regular',
    },
  });
};
