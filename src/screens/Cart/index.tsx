import React from 'react';
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Animated, {SharedValue, useAnimatedStyle} from 'react-native-reanimated';
import {useTheme} from '../../stores/ThemeContext';
import {getDynamicStyles} from './styles';
import useCartStore from '../../stores/CartStore';
import {DeleteIcon} from '../../assets/svg';

const CartScreen = () => {
  const {theme} = useTheme();
  const styles = getDynamicStyles(theme);

  const {cartItems, removeItem, clearCart} = useCartStore();

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  const RightAction = ({progress}: {progress: SharedValue<number>}) => {
    const animatedStyle = useAnimatedStyle(() => {
      const opacity = progress.value;
      return {opacity};
    });

    return (
      <Animated.View style={[styles.deleteButton, animatedStyle]}>
        <DeleteIcon height={20} width={20} />
      </Animated.View>
    );
  };

  const renderRightAction = (progress: SharedValue<number>) => (
    <RightAction progress={progress} />
  );

  const renderCartItem = ({item}: {item: any}) => (
    <ReanimatedSwipeable
      containerStyle={styles.swipeableContainer}
      rightThreshold={70}
      onSwipeableOpen={() => removeItem(item._id)}
      renderRightActions={(progress) => renderRightAction(progress)}
    >
      <View style={styles.productCard}>
        <Image source={{uri: item.image}} style={styles.productImage} />
        <View style={styles.productDetails}>
          <Text style={styles.productTitle}>{item.name}</Text>
          <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
          <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
        </View>
      </View>
    </ReanimatedSwipeable>
  );

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.header}>Your Cart</Text>

        {cartItems.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateText}>Your cart is empty.</Text>
          </View>
        ) : (
          <FlatList
            data={cartItems}
            keyExtractor={(item: any) => `${item._id}-${item.name}`}
            renderItem={renderCartItem}
          />
        )}

        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total: ${calculateTotal().toFixed(2)}</Text>
        </View>

        {cartItems.length > 0 && (
          <View style={{marginBottom: 20}}>
            <TouchableOpacity style={styles.checkoutButton}>
              <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.clearCartButton}
              onPress={clearCart}>
              <Text style={styles.clearCartButtonText}>Clear Cart</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </GestureHandlerRootView>
  );
};

export default CartScreen;
