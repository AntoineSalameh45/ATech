import React, {useEffect, useState, useCallback} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/stacks/RootStackParamList';
import {getDynamicStyles} from './styles';
import {globalStyles} from '../../styles/globalStyles';
import {useTheme} from '../../stores/ThemeContext';
import ProductList from '../../components/organisims/ProductList/ProductList';
import {SearchBar} from '../../components/molecules/Searchbar';
import {fetchProducts} from '../../services/products';
import {iProduct} from '../../services/products.type';

const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {theme} = useTheme();
  const styles = getDynamicStyles(theme);

  const [products, setProducts] = useState<iProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const loadProducts = async (pageNumber = 1) => {
    try {
      const data = await fetchProducts(pageNumber, 10);
      if (pageNumber === 1) {
        setProducts(data.data);
      } else {
        setProducts(prev => [...prev, ...data.data]);
      }
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
      setIsFetchingMore(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setPage(1);
    await loadProducts(1);
    setRefreshing(false);
  }, []);

  const loadMoreProducts = async () => {
    if (!isFetchingMore) {
      setIsFetchingMore(true);
      const nextPage = page + 1;
      setPage(nextPage);
      await loadProducts(nextPage);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const navigateToDetails = (item: iProduct) => {
    navigation.navigate('Details', {
      title: item.title,
      description: item.description,
      price: item.price,
      images: item.images,
    });
  };

  if (isLoading) {
    return (
      <View style={styles.centeredView}>
        <ActivityIndicator
          size="large"
          color={globalStyles.colors.light_blue}
        />
      </View>
    );
  }

  if (error) {
  return (
    <View style={styles.centeredView}>
      <Text style={styles.errorText}>{error}</Text>
      <TouchableOpacity
        style={styles.retryButton}
        onPress={() => {
          setIsLoading(true);
          loadProducts();
        }}>
        <Text style={styles.retryButtonText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );
}


  return (
    <KeyboardAvoidingView
      style={styles.viewContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}>
      <SearchBar />
      <ProductList
        products={products}
        onProductPress={navigateToDetails}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onEndReached={loadMoreProducts}
        isFetchingMore={isFetchingMore}
        styles={styles}
      />
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;
