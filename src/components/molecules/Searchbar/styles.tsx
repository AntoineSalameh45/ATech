import {StyleSheet} from 'react-native';

type Theme = 'light' | 'dark';

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme === 'dark' ? '#333333' : '#f0f0f0',
      borderRadius: 8,
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginVertical: 10,
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: theme === 'dark' ? '#ffffff' : '#333333',
    },
  });

export default getStyles;
