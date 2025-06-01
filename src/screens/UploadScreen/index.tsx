import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  PermissionsAndroid,
  Platform,
  Dimensions,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {launchImageLibrary} from 'react-native-image-picker';
import {getDynamicStyles} from './styles';
import {useTheme} from '../../stores/ThemeContext';
import CameraTest from '../CameraTest';
import api from '../../services/api';
import {AuthStore} from '../../stores/AuthStore';
import MapView, {Marker} from 'react-native-maps';
import notifee from '@notifee/react-native';

const requestGalleryPermission = async () => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Gallery Permission',
        message: 'App needs access to your gallery to upload images',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true;
};

const productSchema = z.object({
  title: z.string().min(1, {message: 'Title is required'}),
  description: z.string().min(1, {message: 'Description is required'}),
  price: z.string().refine(val => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'Price must be a positive number',
  }),
  location: z.string().optional(),
});

type ProductForm = z.infer<typeof productSchema>;

const DEFAULT_LOCATION = {
  name: 'Default Location',
  latitude: 33.8886,
  longitude: 35.4955,
};

const UploadProductScreen = () => {
  const {accessToken} = AuthStore();
  const {theme} = useTheme();
  const styles = getDynamicStyles(theme);
  const [mapVisible, setMapVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(DEFAULT_LOCATION);
  const [images, setImages] = useState<
    Array<{uri: string; type: string; name: string}>
  >([]);
  const [loading, setLoading] = useState(false);
  const [showCamera, setShowCamera] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: '',
      description: '',
      price: '',
      location: '',
    },
  });

  const pickImagesFromGallery = async () => {
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) {
      Alert.alert(
        'Permission denied',
        'Gallery access is required to pick images.',
      );
      return;
    }

    launchImageLibrary(
      {mediaType: 'photo', selectionLimit: 5 - images.length},
      response => {
        if (response.errorCode) {
          Alert.alert('Error', response.errorMessage || 'Something went wrong');
        } else if (response.assets) {
          const newImages = response.assets.map(asset => ({
            uri: asset.uri!,
            type: asset.type || 'image/jpeg',
            name: asset.fileName || 'image.jpg',
          }));
          setImages(prev => [...prev, ...newImages]);
        }
      },
    );
  };

  const onCaptureFromCamera = (uri: string) => {
    if (images.length >= 5) {
      Alert.alert('Image limit', 'You can only upload up to 5 images.');
      return;
    }
    const image = {
      uri,
      type: 'image/jpeg',
      name: uri.split('/').pop() || `photo_${Date.now()}.jpg`,
    };
    setImages(prev => [...prev, image]);
    setShowCamera(false);
  };

  const onMapPress = (event: any) => {
    const {latitude, longitude} = event.nativeEvent.coordinate;
    setSelectedLocation({name: 'Selected Location', latitude, longitude});
  };

  const saveLocation = () => {
    setValue('location', JSON.stringify(selectedLocation));
    setMapVisible(false);
  };

  const onSubmit = async (data: ProductForm) => {
    if (images.length === 0) {
      Alert.alert('Validation error', 'Please select at least one image.');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('price', String(parseFloat(data.price)));

      const locationObj = data.location
        ? JSON.parse(data.location)
        : DEFAULT_LOCATION;
      formData.append('location', JSON.stringify(locationObj));

      images.forEach(image => {
        formData.append('images', {
          uri: image.uri,
          name: image.name,
          type: image.type,
        } as any);
      });

      const response = await api.post('/api/products', formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data) {
        Alert.alert('Success', 'Product uploaded successfully!');
        setImages([]);
        await notifee.requestPermission();
        const channelId = await notifee.createChannel({
          id: 'default',
          name: 'Default Channel',
          vibration: true,
          sound: 'lightsaber',
        });

        await notifee.displayNotification({
          title: 'Product posted',
          body: 'Your product has been uploaded successfully',
          android: {
            channelId,
            pressAction: {id: 'default'},
            smallIcon: 'ic_small_icon',
            color: '#87CEEB',
            largeIcon: require('../../assets/profile-placeholder.png'),
            sound: 'lightsaber',
          },
        });
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (error: any) {
      console.error(error);
      Alert.alert(
        'Upload failed',
        error.response?.data?.message || error.message,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Title</Text>
        <Controller
          control={control}
          name="title"
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              placeholder="Enter product title"
              placeholderTextColor="#888888"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={[styles.input, errors.title && {borderColor: 'red'}]}
            />
          )}
        />
        {errors.title && (
          <Text style={{color: 'red'}}>{errors.title.message}</Text>
        )}

        <Text style={styles.label}>Description</Text>
        <Controller
          control={control}
          name="description"
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              placeholder="Enter product description"
              placeholderTextColor="#888888"
              multiline
              numberOfLines={4}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={[styles.input, errors.description && {borderColor: 'red'}]}
            />
          )}
        />
        {errors.description && (
          <Text style={{color: 'red'}}>{errors.description.message}</Text>
        )}

        <Text style={styles.label}>Price</Text>
        <Controller
          control={control}
          name="price"
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              placeholder="Enter price"
              placeholderTextColor="#888888"
              keyboardType="decimal-pad"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={[styles.input, errors.price && {borderColor: 'red'}]}
            />
          )}
        />
        {errors.price && (
          <Text style={{color: 'red'}}>{errors.price.message}</Text>
        )}

        <Text style={styles.label}>Location (optional)</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setMapVisible(true)}>
          <Text style={styles.label}>Select Location on Map</Text>
        </TouchableOpacity>
        <Controller
          control={control}
          name="location"
          render={({field: {value}}) => (
            <TextInput
              value={value}
              editable={false}
              multiline
              style={[styles.input, errors.location && {borderColor: 'red'}]}
            />
          )}
        />
        <Modal
          visible={mapVisible}
          animationType="slide"
          onRequestClose={() => setMapVisible(false)}>
          <MapView
            style={{
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height,
            }}
            initialRegion={{
              latitude: selectedLocation.latitude,
              longitude: selectedLocation.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            onPress={onMapPress}>
            <Marker
              coordinate={{
                latitude: selectedLocation.latitude,
                longitude: selectedLocation.longitude,
              }}
              title={selectedLocation.name}
            />
          </MapView>
          <View style={styles.mapButtons}>
            <TouchableOpacity style={styles.saveButton} onPress={saveLocation}>
              <Text style={{color: 'white'}}>Save Location</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setMapVisible(false)}>
              <Text style={{color: 'white'}}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <Text style={[styles.label, {marginBottom: 8}]}>
          Selected Images ({images.length} / 5)
        </Text>

        <View style={styles.imagesContainer}>
          {images.map((img, idx) => (
            <View key={idx} style={styles.imageWrapper}>
              <Image source={{uri: img.uri}} style={styles.imageThumb} />
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => {
                  Alert.alert(
                    'Remove Image',
                    'Are you sure you want to remove this image?',
                    [
                      {text: 'Cancel', style: 'cancel'},
                      {
                        text: 'Remove',
                        onPress: () =>
                          setImages(prevImages =>
                            prevImages.filter(
                              (_, imageIdx) => imageIdx !== idx,
                            ),
                          ),
                      },
                    ],
                  );
                }}>
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[
              styles.button,
              styles.buttonPrimary,
              images.length >= 5 && styles.buttonDisabled,
            ]}
            onPress={pickImagesFromGallery}
            disabled={images.length >= 5}>
            <Text style={{color: 'white'}}>
              {images.length >= 5 ? 'Max 5 images selected' : 'Pick Images'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              styles.buttonPrimary,
              images.length >= 5 && styles.buttonDisabled,
            ]}
            onPress={() => setShowCamera(true)}
            disabled={images.length >= 5}>
            <Text style={{color: 'white'}}>Open Camera</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.uploadButton, loading && styles.buttonDisabled]}
          onPress={handleSubmit(onSubmit)}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              Upload Product
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={showCamera}
        animationType="slide"
        onRequestClose={() => setShowCamera(false)}>
        <CameraTest
          onPhotoTaken={uri => onCaptureFromCamera(uri)}
          onCancel={() => setShowCamera(false)}
        />
      </Modal>
    </>
  );
};

export default UploadProductScreen;
