import React from 'react';
import {FlatList} from 'react-native';
import {iProductListProps} from './ProductList.type';
import {ProductCard} from '../../molecules/ProductCard';

const ProductList = ({products, onProductPress, styles}: iProductListProps) => (
  <FlatList
    data={products}
    renderItem={({item}) => (
      <ProductCard
        item={item}
        onPress={() => onProductPress(item)}
        styles={styles}
      />
    )}
    keyExtractor={item => item._id}
    contentContainerStyle={styles.listContainer}
  />
);

export default ProductList;
