import {StyleSheet, Dimensions} from 'react-native';
import {globalColors, globalFonts} from '../../styles/globalStyles';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const BASE_WIDTH = 375;

const scale = (size: number) => (SCREEN_WIDTH / BASE_WIDTH) * size;

export const getDynamicStyles = (theme: string) => {
  const isDark = theme === 'dark';
  const saberGlow = isDark ? '#FF6347' : '#87CEEB';
  const primaryColor = isDark ? '#FF4500' : '#007BFF';

  return StyleSheet.create({
    scrollContainer: {
      flexGrow: 1,
      padding: 16,
      backgroundColor: isDark ? '#121212' : '#F0F8FF',
    },
    title: {
      fontSize: scale(26),
      fontFamily: globalFonts.title_font,
      marginBottom: scale(10),
      color: isDark ? '#ffffff' : '#000000',
      textShadowColor: saberGlow,
      textShadowOffset: {width: 0, height: 0},
      textShadowRadius: scale(6),
    },
    description: {
      fontSize: scale(16),
      marginBottom: scale(20),
      lineHeight: scale(22),
      color: isDark ? '#e0e0e0' : '#333333',
      fontFamily: 'Rancho-Regular',
    },
    priceContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: scale(20),
      backgroundColor: isDark ? '#1c1c1c' : '#1c1c1c22',
      padding: scale(10),
      borderRadius: scale(10),
      borderWidth: 1,
      borderColor: isDark ? '#444' : '#ddd',
      shadowColor: isDark ? '#000' : '#aaa',
      shadowOpacity: 0.2,
      shadowRadius: scale(5),
    },
    descriptionContainer: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      marginBottom: scale(20),
      backgroundColor: isDark ? '#1c1c1c' : '#1c1c1c22',
      padding: scale(10),
      borderRadius: scale(10),
      borderWidth: 1,
      borderColor: isDark ? '#444' : '#ddd',
      shadowColor: isDark ? '#000' : '#aaa',
      shadowOpacity: 0.2,
      shadowRadius: scale(5),
    },
    priceLabel: {
      fontSize: scale(16),
      fontFamily: globalFonts.price_tag,
      color: isDark ? '#ffffff' : '#000000',
    },
    price: {
      fontSize: scale(20),
      fontFamily: globalFonts.price_tag,
      color: primaryColor,
      textShadowColor: saberGlow,
      textShadowOffset: {width: 0, height: 0},
      textShadowRadius: scale(4),
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: scale(20),
    },
    button: {
      backgroundColor: isDark ? '#D32F2F' : '#0288D1',
      width: '70%',
      height: scale(50),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: scale(12),
      shadowColor: saberGlow,
      shadowOpacity: 0.9,
      shadowRadius: scale(15),
      elevation: 10,
    },
    buttonText: {
      color: isDark ? '#F5F5F5' : '#E3F2FD',
      fontSize: scale(18),
      textShadowColor: saberGlow,
      textShadowOffset: {width: 0, height: 0},
      textShadowRadius: scale(6),
      fontFamily: 'Rancho-Regular',
      textAlign: 'center',
    },
    shareButton: {
      backgroundColor: isDark ? '#e0e0e022' : '#1c1c1c22',
      width: '20%',
      height: scale(50),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: scale(12),
      shadowColor: isDark ? '#FF8A65' : '#81D4FA',
      shadowOpacity: 0.8,
      shadowRadius: scale(10),
      marginLeft: scale(10),
    },
    shareButtonText: {
      color: isDark ? '#FF5722' : '#03A9F4',
      fontSize: scale(16),
      fontWeight: 'bold',
      textShadowColor: isDark ? '#FF8A65' : '#81D4FA',
      textShadowOffset: {width: 0, height: 0},
      textShadowRadius: scale(6),
    },
    map: {
      height: scale(300),
      width: '100%',
    },
    mapContainer: {
      marginTop: scale(50),
      marginBottom: scale(50),
    },
    iconTextContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
    },

    contactOwnerButton: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
    },

    contactOwnerText: {
      marginLeft: 8,
      fontSize: 16,
      color: theme === 'dark' ? '#fff' : '#000',
    },
    ownerActionsContainer: {
      marginTop: 20,
      backgroundColor: isDark ? globalColors.dark_background : globalColors.light_background,
      borderRadius: 10,
      flexDirection: 'column',
      gap: 5,
    },
    editButton: {
      padding: 10,
      backgroundColor: isDark ? globalColors.dark_background : globalColors.light_background,
      borderRadius: 5,
      alignItems: 'center',
    },
    editButtonText: {
      color: isDark ? '#FF5722' : '#03A9F4',
      fontSize: 16,
      fontWeight: 'bold',
    },
    deleteButton: {
      padding: 10,
      backgroundColor: globalColors.dark_red,
      borderRadius: 5,
      alignItems: 'center',
    },
    deleteButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 25,
    right: 10,
    padding: 10,
    backgroundColor: 'transparent',
    borderRadius: 20,
    zIndex: 10,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  fullScreenImage: {
    width: '100%',
    height: '80%',
  },
  });
};
