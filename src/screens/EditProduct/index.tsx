import React, { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/stacks/RootStackParamList';
import { useTheme } from '../../stores/ThemeContext';
import { BASE_URL } from '@env';
import {AuthStore} from '../../stores/AuthStore';
import getDynamicStyles from './styles';

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
  const [latitude, setLatitude] = useState(initialLatitude.toString());
  const [longitude, setLongitude] = useState(initialLongitude.toString());
  const [locationName, setLocationName] = useState(initialLocationName);

  const handleSave = async () => {
    if (!title || !description || !price || !latitude || !longitude) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    const updatedProduct = {
      title,
      description,
      price: parseFloat(price),
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      locationName,
    };

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
    }
  };

  return (
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

      <Text style={styles.label}>Latitude</Text>
      <TextInput
        style={styles.input}
        value={latitude}
        onChangeText={setLatitude}
        placeholder="Enter latitude"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Longitude</Text>
      <TextInput
        style={styles.input}
        value={longitude}
        onChangeText={setLongitude}
        placeholder="Enter longitude"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Location Name</Text>
      <TextInput
        style={styles.input}
        value={locationName}
        onChangeText={setLocationName}
        placeholder="Enter location name"
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditProduct;
