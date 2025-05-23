import {StyleSheet} from 'react-native';

const getDynamicStyles = (theme: 'light' | 'dark') => {
  const isDark = theme === 'dark';

  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: isDark ? '#121212' : '#f9f9f9',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 24,
      gap: 10,
    },
    imageWrapper: {
      marginRight: 16,
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      borderWidth: 1,
      borderColor: isDark ? '#ddd' : '#00000044',
      resizeMode: 'cover',
    },
    profileImageDisabled: {
      opacity: 0.6,
    },
    details: {
      flex: 1,
    },
    nameText: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 8,
      padding: 10,
      color: isDark ? '#fff' : '#000',
    },
    nameInput: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 8,
      backgroundColor: isDark ? '#222' : '#f0f0f0',
      borderWidth: 1,
      borderColor: isDark ? '#555' : '#00000044',
      borderRadius: 2,
      padding: 10,
      color: isDark ? '#fff' : '#000',
    },
    nameInputMarginTop: {
      marginTop: 10,
      fontSize: 16,
      fontWeight: 'bold',
      backgroundColor: isDark ? '#222' : '#f0f0f0',
      borderWidth: 1,
      borderColor: isDark ? '#555' : '#00000044',
      borderRadius: 2,
      padding: 10,
      color: isDark ? '#fff' : '#000',
    },
    buttonContainer: {
      flexDirection: 'row',
      gap: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
    editButton: {
      backgroundColor: isDark ? '#1C1C1Edd' : '#87CEEB',
      padding: 10,
      borderRadius: 8,
      width: '70%',
      borderWidth: 1,
      borderColor: isDark ? '#FF4C44' : '#F0F8FF66',
    },
    editButtonText: {
      color: isDark ? '#FF4C4C' : '#fff',
      textAlign: 'center',
    },
    logoutButton: {
      backgroundColor: isDark ? '#FF6666' : '#FF4C4C',
      padding: 10,
      borderRadius: 8,
    },
    logoutButtonText: {
      color: '#fff',
      textAlign: 'center',
      fontWeight: 'bold',
    },
    loadingProductsContainer: {
      marginTop: 20,
      alignItems: 'center',
    },
    productListContainer: {
      padding: 10,
    },
    productContainer: {
      flex: 1,
      margin: 5,
      backgroundColor: isDark ? '#222' : '#fff',
      borderRadius: 8,
      overflow: 'hidden',
      elevation: 2,
    },
    productImage: {
      width: '100%',
      height: 120,
      resizeMode: 'cover',
    },
    productDetails: {
      padding: 10,
    },
    productTitle: {
      fontWeight: 'bold',
      fontSize: 14,
      color: isDark ? '#eee' : '#111',
    },
    productPrice: {
      marginTop: 4,
      color: isDark ? '#aaa' : '#555',
      fontSize: 13,
    },
    noProductsContainer: {
      marginTop: 20,
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    noProductsText: {
      fontSize: 16,
      color: isDark ? '#ccc' : '#555',
      textAlign: 'center',
      marginBottom: 6,
    },
    pullToRefreshText: {
      fontSize: 12,
      color: isDark ? '#999' : '#999',
      fontStyle: 'italic',
    },
  });
};

export default getDynamicStyles;
