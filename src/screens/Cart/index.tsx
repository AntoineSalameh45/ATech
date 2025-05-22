import React from 'react';
import {ScrollView, View, Text, TouchableOpacity, Image} from 'react-native';
import {useTheme} from '../../stores/ThemeContext';
import {getDynamicStyles} from './styles';
import useCartStore from '../../stores/CartStore';
import { DeleteIconRed } from '../../assets/svg';

const CartScreen = () => {
  const {theme} = useTheme();
  const styles = getDynamicStyles(theme);

  const {cartItems, removeItem, clearCart} = useCartStore(); // Import `clearCart`

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Your Cart</Text>

      {cartItems.length === 0 ? (
        <Text style={styles.emptyCart}>Your cart is empty.</Text>
      ) : (
        <>
          {cartItems.map(item => (
            <View key={`${item._id}-${item.name}`} style={styles.cartItem}>
              <Image source={{uri: item.image}} style={styles.itemImage} />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                <Text style={styles.itemQuantity}>
                  Quantity: {item.quantity}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeItem(item._id)}>
                <DeleteIconRed height={20} width={20}/>
              </TouchableOpacity>
            </View>
          ))}

          <TouchableOpacity
            style={styles.clearCartButton}
            onPress={clearCart}>
            <Text style={styles.clearCartButtonText}>Clear Cart</Text>
          </TouchableOpacity>
        </>
      )}

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total:</Text>
        <Text style={styles.totalAmount}>${calculateTotal().toFixed(2)}</Text>
      </View>

      <TouchableOpacity style={styles.checkoutButton}>
        <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CartScreen;
