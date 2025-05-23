import React from 'react';
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useTheme} from '../../stores/ThemeContext';
import {getDynamicStyles} from './styles';
import useCartStore from '../../stores/CartStore';
import {DeleteIconRed} from '../../assets/svg';

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

  const renderCartItem = ({item}: {item: any}) => (
    <View style={styles.productCard}>
      <Image source={{uri: item.image}} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productTitle}>{item.name}</Text>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
        <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeItem(item._id)}>
        <DeleteIconRed height={20} width={20} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Cart</Text>

      {cartItems.length === 0 ? (
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateText}>Your cart is empty.</Text>
        </View>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={item => `${item._id}-${item.name}`}
          renderItem={renderCartItem}
          contentContainerStyle={{paddingBottom: 20}}
        />
      )}

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total:</Text>
        <Text style={styles.totalAmount}>${calculateTotal().toFixed(2)}</Text>
      </View>

      {cartItems.length > 0 && (
        <View style={{marginBottom: 20}}>
          <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.clearCartButton} onPress={clearCart}>
            <Text style={styles.clearCartButtonText}>Clear Cart</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CartScreen;
