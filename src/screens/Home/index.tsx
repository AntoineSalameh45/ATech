import React, {useEffect, useState, useCallback, useRef} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/stacks/RootStackParamList';
import {getDynamicStyles} from './styles';
import {globalStyles} from '../../styles/globalStyles';
import {useTheme} from '../../stores/ThemeContext';
import ProductList from '../../components/organisims/ProductList/ProductList';
import {SearchBar} from '../../components/molecules/Searchbar';
import {fetchProducts} from '../../services/products';
import {DetailsScreenParams, iProduct} from '../../services/products.type';
import {SkeletonLoader} from '../../components/molecules/SkeletonLoader';

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
  const [sortOption, setSortOption] = useState<'default' | 'asc' | 'desc'>(
    'default',
  );
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const loadProducts = useCallback(async (pageNumber = 1, query = '') => {
    try {
      const data = await fetchProducts(pageNumber, 10, query);
      setProducts(prev => {
        const combinedProducts =
          pageNumber === 1 ? data.data : [...prev, ...data.data];
        const uniqueProducts = Array.from(
          new Map<string, iProduct>(
            combinedProducts.map((product: iProduct) => [product._id, product]),
          ).values(),
        );
        return uniqueProducts as iProduct[];
      });

      setError(null);
    } catch (err: any) {
      console.error('Error during product fetch:', err);
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
      setIsFetchingMore(false);
    }
  }, []);

  const onSearch = (query: string) => {
    setSearchQuery(query);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      setPage(1);
      setIsLoading(true);
      loadProducts(1, query);
    }, 1000);
  };

  useEffect(() => {
    loadProducts(1, searchQuery);
  }, [loadProducts, searchQuery]);

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  const loadMoreProducts = async () => {
    if (!isFetchingMore) {
      setIsFetchingMore(true);
      const nextPage = page + 1;
      setPage(nextPage);
      await loadProducts(nextPage, searchQuery);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setPage(1);
    await loadProducts(1, searchQuery);
    setRefreshing(false);
  }, [loadProducts, searchQuery]);

  const navigateToDetails = (item: iProduct) => {
    const params: DetailsScreenParams = {
      _id: item._id,
      title: item.title,
      description: item.description,
      price: item.price,
      images: item.images,
      latitude: item.location.latitude,
      longitude: item.location.longitude,
      user: item.user,
      locationName: item.location.name,
    };
    navigation.navigate('ProductScreen', {
      screen: 'Details',
      params,
    });
  };

  const getSortedProducts = () => {
    if (sortOption === 'asc') {
      return [...products].sort((a, b) => a.price - b.price);
    }
    if (sortOption === 'desc') {
      return [...products].sort((a, b) => b.price - a.price);
    }
    return products;
  };

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      setPage(1);
      loadProducts(1, searchQuery);
    }, [loadProducts, searchQuery])
  );

  return (
    <KeyboardAvoidingView
      style={styles.viewContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}>
      <SearchBar onSearch={onSearch} />
      <View style={styles.sortOptionsContainer}>
        <Text style={styles.sortLabel}>Sort by:</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.sortButtonsContainer}>
          <TouchableOpacity
            style={[
              styles.sortButton,
              sortOption === 'default' && styles.selectedSortButton,
            ]}
            onPress={() => setSortOption('default')}>
            <Text style={styles.sortButtonText}>Default</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.sortButton,
              sortOption === 'asc' && styles.selectedSortButton,
            ]}
            onPress={() => setSortOption('asc')}>
            <Text style={styles.sortButtonText}>Price: Low to High</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.sortButton,
              sortOption === 'desc' && styles.selectedSortButton,
            ]}
            onPress={() => setSortOption('desc')}>
            <Text style={styles.sortButtonText}>Price: High to Low</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      {isLoading ? (
        <View style={styles.listContainer}>
          <FlatList
            data={Array(6).fill(null)}
            keyExtractor={(item, index) => `skeleton-${index}`}
            numColumns={2}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            renderItem={() => <SkeletonLoader />}
          />
        </View>
      ) : error ? (
        <View style={globalDynamicStyles.centeredView}>
          <Text style={globalDynamicStyles.errorText}>{error}</Text>
          <TouchableOpacity
            style={globalDynamicStyles.retryButton}
            onPress={() => {
              setIsLoading(true);
              loadProducts(1, searchQuery);
            }}>
            <Text style={globalDynamicStyles.retryButtonText}>
              {searchQuery ? 'Retry Search' : 'Retry'}
            </Text>
          </TouchableOpacity>
          {searchQuery.length > 0 && (
            <TouchableOpacity
              style={[globalDynamicStyles.retryButton, {marginTop: 12}]}
              onPress={() => {
                setSearchQuery('');
                setIsLoading(true);
                setPage(1);
                loadProducts(1, '');
              }}>
              <Text style={globalDynamicStyles.retryButtonText}>
                Clear Search & Show All
              </Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <ProductList
          products={getSortedProducts()}
          onProductPress={navigateToDetails}
          refreshing={refreshing}
          onRefresh={onRefresh}
          onEndReached={loadMoreProducts}
          isFetchingMore={isFetchingMore}
          styles={styles}
        />
      )}
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;
