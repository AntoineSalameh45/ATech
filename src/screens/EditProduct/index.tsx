import React, { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/stacks/RootStackParamList';
import { useTheme } from '../../stores/ThemeContext';
import { BASE_URL } from '@env';
import { AuthStore } from '../../stores/AuthStore';
import getDynamicStyles from './styles';
import { MapModal } from '../../components/molecules/MapModal';

type EditProductScreenRouteProp = RouteProp<RootStackParamList, 'EditProduct'>;

type Props = {
  route: EditProductScreenRouteProp;
};

const EditProduct = ({ route }: Props) => {
  const {
    productId,
    title: initialTitle,
    description: initialDescription,
    price: initialPrice,
    latitude: initialLatitude,
    longitude: initialLongitude,
    locationName: initialLocationName,
  } = route.params;

  const { theme } = useTheme();
  const styles = getDynamicStyles(theme);
  const navigation = useNavigation();
  const { accessToken } = AuthStore();

  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [price, setPrice] = useState(initialPrice.toString());
  const [locationName, setLocationName] = useState(initialLocationName);
  const [location, setLocation] = useState({
    name: initialLocationName,
    latitude: initialLatitude,
    longitude: initialLongitude,
  });
  const [mapVisible, setMapVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!title || !description || !price) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    const updatedProduct = {
      title,
      description,
      price: parseFloat(price),
      location: {
        name: location.name || locationName,
        latitude: location.latitude,
        longitude: location.longitude,
      },
    };

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(updatedProduct),
      });

      if (!response.ok) {
        throw new Error('Failed to update product.');
      }

      Alert.alert('Success', 'Product updated successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Update error:', error);
      Alert.alert('Error', 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const saveLocation = () => {
    setLocationName(location.name);
    setMapVisible(false);
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter product title"
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter product description"
          multiline
        />

        <Text style={styles.label}>Price</Text>
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          placeholder="Enter product price"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Location</Text>
        <TouchableOpacity
          style={styles.label}
          onPress={() => setMapVisible(true)}>
          <Text style={styles.title}>
            {location.name || 'Set Location'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.label}>Location Name</Text>
        <TextInput
          style={styles.input}
          value={locationName}
          onChangeText={setLocationName}
          placeholder="Enter location name"
        />

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveButtonText}>Save</Text>
          )}
        </TouchableOpacity>
      </ScrollView>

      <MapModal
        visible={mapVisible}
        onClose={() => setMapVisible(false)}
        onSave={saveLocation}
        onMapPress={(event) =>
          setLocation({
            ...location,
            latitude: event.nativeEvent.coordinate.latitude,
            longitude: event.nativeEvent.coordinate.longitude,
          })
        }
        selectedLocation={location}
      />
    </>
  );
};

export default EditProduct;
