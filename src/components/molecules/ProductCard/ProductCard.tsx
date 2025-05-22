import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {iProductCardProps} from './ProductCard.type';

const ProductCard = ({item, onPress, styles}: iProductCardProps) => {
  const shortDescription =
    item.description.length > 100
      ? `${item.description.substring(0, 100)}...`
      : item.description;

  return (
    <TouchableOpacity style={styles.productContainer} onPress={onPress}>
      <Image source={{uri: item.images[0]?.url}} style={styles.productImage} />

      <View style={styles.productDetails}>
        <Text style={styles.productTitle} numberOfLines={1}>
          {item.title}
        </Text>

        <Text style={styles.productDescription}>
          {shortDescription}
          {item.description.length > 100 && (
            <Text style={styles.clickForMore}> Click for more</Text>
          )}
        </Text>

        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
