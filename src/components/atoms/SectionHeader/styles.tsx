import {StyleSheet} from 'react-native';

const getDynamicStyles = (theme: 'light' | 'dark') =>
  StyleSheet.create({
    container: {
      marginVertical: 12,
      paddingHorizontal: 10,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme === 'dark' ? '#fff' : '#222',
    },
    underline: {
      marginTop: 4,
      height: 3,
      width: 60,
      backgroundColor: theme === 'dark' ? '#FF4C4C' : '#87CEEB',
      borderRadius: 2,
    },
  });

export default getDynamicStyles;
