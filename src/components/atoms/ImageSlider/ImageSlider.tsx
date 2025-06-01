import React, {useState, useRef} from 'react';
import {
  View,
  FlatList,
  TouchableWithoutFeedback,
  Animated,
  GestureResponderEvent,
} from 'react-native';
import {ImageSliderProps} from './ImageSlider.type';
import styles from './styles';

const SWIPE_THRESHOLD = 10; // Minimum movement threshold to consider as swipe

const ImageSlider = ({
  images,
  onImagePress,
  onImageLongPress,
}: ImageSliderProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scaleAnimation = useRef(new Animated.Value(1)).current;
  const touchStart = useRef({x: 0, y: 0}).current;

  const onViewableItemsChanged = ({viewableItems}: any) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index || 0);
    }
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const handleTouchStart = (evt: GestureResponderEvent) => {
    const {pageX, pageY} = evt.nativeEvent;
    touchStart.x = pageX;
    touchStart.y = pageY;

    Animated.timing(scaleAnimation, {
      toValue: 0.9,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handleTouchEnd = (evt: GestureResponderEvent, url: string) => {
    const {pageX, pageY} = evt.nativeEvent;
    const dx = Math.abs(pageX - touchStart.x);
    const dy = Math.abs(pageY - touchStart.y);

    const isSwipe = dx > SWIPE_THRESHOLD || dy > SWIPE_THRESHOLD;

    Animated.timing(scaleAnimation, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      if (!isSwipe && onImagePress) {
        onImagePress(url);
      }
    });
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
            onPressIn={handleTouchStart}
            onPressOut={(e) => handleTouchEnd(e, item.url)}
            onLongPress={() => onImageLongPress?.(item.url)}>
            <Animated.Image
              source={{uri: item.url}}
              style={[styles.image, {transform: [{scale: scaleAnimation}]}]}
              resizeMode="contain"
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
