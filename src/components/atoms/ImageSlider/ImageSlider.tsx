import React, {useState} from 'react';
import {
  View,
  Image,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import {ImageSliderProps} from './ImageSlider.type';
import styles from './styles';

const ImageSlider = ({images, onImageLongPress}: ImageSliderProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onViewableItemsChanged = ({viewableItems}: any) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index || 0);
    }
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        renderItem={({item}) => (
          <TouchableWithoutFeedback
            onLongPress={() => onImageLongPress?.(item.url)}>
            <Image
              source={{uri: item.url}}
              style={styles.image}
              resizeMode="cover"
            />
          </TouchableWithoutFeedback>
        )}
      />
      <View style={styles.pagination}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              activeIndex === index ? styles.activeDot : undefined,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default ImageSlider;
