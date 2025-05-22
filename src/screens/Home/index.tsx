import React, {useEffect, useState, useCallback, useRef} from 'react';
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
import {globalColors, globalStyles} from '../../styles/globalStyles';
import {useTheme} from '../../stores/ThemeContext';
import ProductList from '../../components/organisims/ProductList/ProductList';
import {SearchBar} from '../../components/molecules/Searchbar';
import {fetchProducts} from '../../services/products';
import {DetailsScreenParams, iProduct} from '../../services/products.type';

const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {theme} = useTheme();
  const styles = getDynamicStyles(theme);
  const globalDynamicStyles = globalStyles(theme);

  const [products, setProducts] = useState<iProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const loadProducts = async (pageNumber = 1, query = '') => {
  try {
    const data = await fetchProducts(pageNumber, 10, query);
    console.log('Fetched data:', data);
    if (pageNumber === 1) {
      setProducts(data.data);
    } else {
      setProducts(prev => [...prev, ...data.data]);
    }
    setError(null);
  } catch (err: any) {
    console.error('Error during product fetch:', err);
    setError(err.message || 'Something went wrong');
  } finally {
    setIsLoading(false);
    setIsFetchingMore(false);
  }
};

  const onSearch = (query: string) => {
    setSearchQuery(query);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      setPage(1);
      loadProducts(1, query);
    }, 1000);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setPage(1);
    await loadProducts(1, searchQuery);
    setRefreshing(false);
  }, [searchQuery]);

  const loadMoreProducts = async () => {
    if (!isFetchingMore) {
      setIsFetchingMore(true);
      const nextPage = page + 1;
      setPage(nextPage);
      await loadProducts(nextPage, searchQuery);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const navigateToDetails = (item: iProduct) => {
    const params: DetailsScreenParams = {
      title: item.title,
      description: item.description,
      price: item.price,
      images: item.images,
      latitude: item.location.latitude,
      longitude: item.location.longitude,
    };

    navigation.navigate('Details', params);
  };

  if (isLoading) {
    return (
      <View style={globalDynamicStyles.centeredView}>
        <ActivityIndicator
          size="large"
          color={globalColors.light_blue}
        />
      </View>
    );
  }

  if (error) {
  return (
    <View style={globalDynamicStyles.centeredView}>
      <Text style={globalDynamicStyles.errorText}>{error}</Text>
      <TouchableOpacity
        style={globalDynamicStyles.retryButton}
        onPress={() => {
          setIsLoading(true);
          if (searchQuery) {
            loadProducts(page, searchQuery);
          } else {
            loadProducts();
          }
        }}>
        <Text style={globalDynamicStyles.retryButtonText}>
          {searchQuery ? 'Retry Search' : 'Retry'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

  return (
    <KeyboardAvoidingView
      style={styles.viewContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}>
      <SearchBar onSearch={onSearch} />
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
