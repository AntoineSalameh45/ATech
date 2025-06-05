import React, {useState, useRef} from 'react';
import {
  View,
  FlatList,
  Pressable,
  Animated,
  GestureResponderEvent,
} from 'react-native';
import {ImageSliderProps} from './ImageSlider.type';
import styles from './styles';

const SWIPE_THRESHOLD = 10;

const ImageSlider = ({
  images,
  onImagePress,
  onImageLongPress,
}: ImageSliderProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scaleAnimations = useRef(
    images.map(() => new Animated.Value(1)),
  ).current;

  const touchStart = useRef<{x: number; y: number}>({x: 0, y: 0});
  const longPressActivated = useRef(false);

  const onViewableItemsChanged = useRef(({viewableItems}: any) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index ?? 0);
    }
  }).current;

  const viewabilityConfig = {itemVisiblePercentThreshold: 50};

  const handleTouchStart = (index: number) => (_evt: GestureResponderEvent) => {
    touchStart.current = {x: 0, y: 0};
    longPressActivated.current = false;

    Animated.timing(scaleAnimations[index], {
      toValue: 0.9,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handleTouchEnd =
    (index: number, url: string) => (evt: GestureResponderEvent) => {
      const {pageX, pageY} = evt.nativeEvent;
      const dx = Math.abs(pageX - touchStart.current.x);
      const dy = Math.abs(pageY - touchStart.current.y);

      const isSwipe = dx > SWIPE_THRESHOLD || dy > SWIPE_THRESHOLD;

      Animated.timing(scaleAnimations[index], {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start(() => {
        if (!isSwipe && onImagePress && !longPressActivated.current) {
          onImagePress(url);
        }
        longPressActivated.current = false;
      });
    };

  const handleTouchStartPosition =
    (_index: number) => (evt: GestureResponderEvent) => {
      const {pageX, pageY} = evt.nativeEvent;
      touchStart.current = {x: pageX, y: pageY};
    };

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        initialNumToRender={images.length}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        renderItem={({item, index}) => (
          <Pressable
            testID="slider-image-pressable"
            onPressIn={handleTouchStart(index)}
            onTouchStart={handleTouchStartPosition(index)}
            onPressOut={handleTouchEnd(index, item.url)}
            onLongPress={() => {
              longPressActivated.current = true;
              onImageLongPress?.(item.url);
            }}>
            <Animated.Image
              testID="slider-image"
              source={{uri: item.url}}
              style={[
                styles.image,
                {transform: [{scale: scaleAnimations[index]}]},
              ]}
              resizeMode="contain"
            />
          </Pressable>
        )}
      />
      <View style={styles.pagination}>
        {images.map((_, index) => (
          <View
            key={index}
            testID="pagination-dot"
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
