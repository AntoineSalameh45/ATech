import {BASE_URL} from '@env';
import React from 'react';
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Image,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {globalStyles} from '../../../styles/globalStyles';

const ProductList = ({
  products,
  onProductPress,
  styles,
  refreshing,
  onRefresh,
  onEndReached,
  isFetchingMore,
}: any) => {
  const renderItem = ({item}: any) => (
    <TouchableOpacity
      style={styles.productContainer}
      onPress={() => onProductPress(item)}>
      <Image
        source={{
          uri:
            item.images && item.images.length > 0
              ? `${BASE_URL}${item.images[0].url}`
              : 'https://via.placeholder.com/150',
        }}
        style={styles.productImage}
      />
      <View style={styles.productDetails}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderFooter = () =>
    isFetchingMore ? (
      <View style={{paddingVertical: 16}}>
        <ActivityIndicator
          size="small"
          color={globalStyles.colors.light_blue}
        />
      </View>
    ) : null;

  return (
    <FlatList
      data={products}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
      numColumns={2}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
    />
  );
};

export default ProductList;
