import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/stacks/RootStackParamList';
import { getDynamicStyles } from './styles';
import { useTheme } from '../../stores/ThemeContext';
import { BASE_URL } from '@env';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import useCartStore from '../../stores/CartStore';

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

type Props = {
  route: DetailsScreenRouteProp;
};

const Details = ({ route }: Props) => {
  const { title, description, price, images, latitude, longitude, id } = route.params;
  const { theme } = useTheme();
  const styles = getDynamicStyles(theme);
  const { addItem } = useCartStore();

  const imageUrl =
    images && images.length > 0
      ? `${BASE_URL}${images[0].url}`
      : 'https://via.placeholder.com/300';

  const handleAddToCart = () => {
    addItem({
      id,
      name: title,
      price,
      quantity: 1,
      image: imageUrl,
    });
    Alert.alert('Success', 'Item added to cart!');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.priceLabel}>Price:</Text>
        <Text style={styles.price}>${price}</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.priceLabel}>Description:</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareButton}>
          <Text style={styles.shareButtonText}>Share</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.mapContainer}>
        <MapView
          key={theme}
          provider={PROVIDER_GOOGLE}
          region={{
            latitude: latitude || 33.8886,
            longitude: longitude || 35.4955,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={styles.map}
          userInterfaceStyle={theme === 'dark' ? 'dark' : 'light'}
        >
          <Marker
            coordinate={{
              latitude: latitude || 33.8886,
              longitude: longitude || 35.4955,
            }}
            title={title}
            description={description}
          />
        </MapView>
      </View>
    </ScrollView>
  );
};

export default Details;
