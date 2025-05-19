import {StyleSheet} from 'react-native';

export const getDynamicStyles = (theme: 'light' | 'dark') => {
  const isLight = theme === 'light';

  return StyleSheet.create({
    tabBar: {
      flexDirection: 'row',
      backgroundColor: isLight ? '#87CEEB' : '#FF6347',
      padding: 0,
      width: '80%',
      alignSelf: 'center',
      position: 'absolute',
      bottom: 0,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
    },
    tabContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },
    tabButton: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 8,
      backgroundColor: 'transparent',
      flexDirection: 'row',
      minHeight: 48,
    },

    tabButtonFocused: {
      backgroundColor: isLight ? '#F0F8FF66' : '#1C1C1Edd',
    },

    tabButtonLeft: {
      borderTopLeftRadius: 16,
    },

    tabButtonRight: {
      borderTopRightRadius: 16,
    },

    tabButtonMiddle: {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
    },
  });
};
