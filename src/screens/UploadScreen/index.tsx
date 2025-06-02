import React, {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  Modal,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {launchImageLibrary} from 'react-native-image-picker';
import {getDynamicStyles} from './styles';
import {useTheme} from '../../stores/ThemeContext';
import CameraTest from '../CameraTest';
import api from '../../services/api';
import {AuthStore} from '../../stores/AuthStore';
import notifee from '@notifee/react-native';
import {ProductForm} from '../../components/molecules/ProductForm';
import {ImagePicker} from '../../components/molecules/ImagePicker';
import {MapModal} from '../../components/molecules/MapModal';

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

  const form = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: '',
      description: '',
      price: '',
      location: '',
    },
  });

  const {handleSubmit, setValue} = form;

  const addImage = (image: {uri: string; type: string; name: string}) => {
    if (images.length >= 5) {
      Alert.alert('Image limit', 'You can only upload up to 5 images.');
      return;
    }
    setImages(prev => [...prev, image]);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

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
            type: asset.type || 'image/jpeg' || 'image/png',
            name: asset.fileName || 'image.jpg' || 'image.png',
          }));
          setImages(prev => [...prev, ...newImages]);
        }
      },
    );
  };

  const onCaptureFromCamera = (uri: string) => {
    addImage({
      uri,
      type: 'image/jpeg',
      name: uri.split('/').pop() || `photo_${Date.now()}.jpg`,
    });
    setShowCamera(false);
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
        <ProductForm
          form={form}
          styles={styles}
          onSelectLocation={() => setMapVisible(true)}
        />
        <ImagePicker
          images={images}
          onAddImage={pickImagesFromGallery}
          onRemoveImage={removeImage}
          onOpenCamera={() => setShowCamera(true)}
        />
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
          style={styles.uploadButton}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Text style={styles.buttonText}>Upload Product</Text>
          )}
        </TouchableOpacity>
        <MapModal
          visible={mapVisible}
          onClose={() => setMapVisible(false)}
          onSave={saveLocation}
          onMapPress={event =>
            setSelectedLocation(event.nativeEvent.coordinate)
          }
          selectedLocation={selectedLocation}
        />
      </ScrollView>

      <Modal
        visible={showCamera}
        animationType="slide"
        onRequestClose={() => setShowCamera(false)}>
        <CameraTest
          onPhotoTaken={onCaptureFromCamera}
          onCancel={() => setShowCamera(false)}
        />
      </Modal>
    </>
  );
};

export default UploadProductScreen;
