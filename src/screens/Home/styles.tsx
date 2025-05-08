import { StyleSheet } from 'react-native';

export const getDynamicStyles = (theme: 'light' | 'dark') => {
  const isLight = theme === 'light';

  return StyleSheet.create({
    viewContainer: {
      flex: 1,
      padding: 16,
      backgroundColor: isLight ? '#ffffff' : '#222222',
    },
    text: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 16,
      color: isLight ? '#000000' : '#ffffff',
    },
    listContainer: {
      paddingVertical: 8,
    },
    productContainer: {
      flexDirection: 'row',
      marginBottom: 16,
      backgroundColor: isLight ? '#f9f9f9' : '#444444',
      borderRadius: 8,
      padding: 8,
      shadowColor: isLight ? '#000' : '#fff',
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    productImage: {
      width: 100,
      height: 100,
      borderRadius: 8,
      marginRight: 8,
    },
    productDetails: {
      flex: 1,
    },
    productTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 4,
      color: isLight ? '#000000' : '#ffffff',
    },
    productDescription: {
      fontSize: 14,
      color: isLight ? '#555' : '#cccccc',
      marginBottom: 8,
    },
    productPrice: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isLight ? '#007BFF' : '#77AAFF',
    },
    clickForMore: {
      color: isLight ? '#007BFF' : '#77AAFF',
      fontWeight: 'bold',
    },
  });
};
