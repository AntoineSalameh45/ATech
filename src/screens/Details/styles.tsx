import {StyleSheet} from 'react-native';

export const getDynamicStyles = (theme: string) => {
  const isDark = theme === 'dark';

  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: isDark ? '#121212' : '#ffffff',
    },
    image: {
      width: '100%',
      height: 250,
      borderRadius: 10,
      marginBottom: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      color: isDark ? '#ffffff' : '#000000',
    },
    description: {
      fontSize: 16,
      marginBottom: 20,
      lineHeight: 22,
      color: isDark ? '#e0e0e0' : '#333333',
    },
    price: {
      fontSize: 20,
      fontWeight: 'bold',
      color: isDark ? '#76ff03' : '#388e3c',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    button: {
      backgroundColor: isDark ? '#1E88E5' : '#007BFF',
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
    },
    buttonText: {
      color: isDark ? '#000000' : '#ffffff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
};
