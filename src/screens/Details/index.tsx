import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Linking,
  PermissionsAndroid,
  Platform,
  Share,
} from 'react-native';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/stacks/RootStackParamList';
import {getDynamicStyles} from './styles';
import {useTheme} from '../../stores/ThemeContext';
import {BASE_URL} from '@env';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import useCartStore from '../../stores/CartStore';
import {ImageSlider} from '../../components/atoms/ImageSlider';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {MailIconBlue, MailIconRed} from '../../assets/svg';
import RNFetchBlob from 'rn-fetch-blob';
import api from '../../services/api';
import notifee from '@notifee/react-native';

const fetchCurrentUser = async () => {
  try {
    const response = await api.get('/api/user/profile');
    console.log(response.data.data.user);
    return response.data.data.user;
  } catch (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
};

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

type Props = {
  route: DetailsScreenRouteProp;
};

const Details = ({route}: Props) => {
  const {
    title,
    description,
    price,
    images,
    latitude,
    longitude,
    _id,
    user: productOwner,
    locationName,
  } = route.params;
  const {theme} = useTheme();
  const styles = getDynamicStyles(theme);
  const {addItem} = useCartStore();
  const navigation = useNavigation();
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const user = await fetchCurrentUser();
        if (user) {
          setCurrentUserEmail(user.email);
        }
      } catch (error) {
        console.error('Error setting user email:', error);
      }
    };
    getCurrentUser();
  }, []);

  const formattedImages = images?.map((img: {url: string}) => ({
    url: `${BASE_URL}${img.url}`,
  }));

  const handleAddToCart = () => {
    addItem({
      _id,
      name: title,
      price,
      quantity: 1,
      image: formattedImages[0]?.url || '',
    });
    Alert.alert('Success', 'Item added to cart!');
  };

  const handleShare = async () => {
    const productUrl = `atech://products/details/${_id}`;
    const message = `Check out this product: ${title}\n${productUrl}`;

    try {
      await notifee.requestPermission();
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        vibration: true,
        sound: 'lightsaber',
      });

      await notifee.displayNotification({
        title: 'Product shared',
        body: 'You shared a product link',
        android: {
          channelId,
          pressAction: {id: 'default'},
          smallIcon: 'ic_small_icon',
          color: '#87CEEB',
          largeIcon: require('../../assets/profile-placeholder.png'),
          sound: 'lightsaber',
        },
      });

      await Share.share({
        message,
        url: productUrl,
      });
    } catch (error) {
      console.error('Error sharing product:', error);
      Alert.alert(
        'Error',
        'An unexpected error occurred while sharing the product.',
      );
    }
  };

  const handleLongPressImage = async (imageUrl: string) => {
    try {
      if (Platform.OS === 'android') {
        const writePermission =
          Platform.Version >= 33
            ? await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
              )
            : await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              );

        if (writePermission !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert(
            'Permission Denied',
            'Storage permission is required to save images.',
          );
          return;
        }
      }

      const res = await RNFetchBlob.config({
        fileCache: true,
        appendExt: 'jpg',
      }).fetch('GET', imageUrl);

      const imagePath =
        Platform.OS === 'android' ? 'file://' + res.path() : res.path();

      await CameraRoll.saveAsset(imagePath, {
        type: 'photo',
        album: 'ATech',
      });

      Alert.alert('Success', 'Image saved to gallery!');
    } catch (error) {
      Alert.alert('Error', 'Failed to save image.');
      console.error('Save image error:', error);
    }
  };

  const handleContactOwner = () => {
    const email = productOwner?.email;
    if (!email) {
      Alert.alert('Error', 'Owner email is not available.');
      return;
    }

    const subject = encodeURIComponent(`Inquiry about ${title}`);
    const body = encodeURIComponent(
      `Hi,\n\nI am interested in the product "${title}". Please provide more details.\n\nThanks.`,
    );
    const mailtoUrl = `mailto:${email}?subject=${subject}&body=${body}`;

    Linking.canOpenURL(mailtoUrl)
      .then(supported => {
        if (!supported) {
          Alert.alert('Error', 'Unable to open mail client.');
        } else {
          Linking.openURL(mailtoUrl);
        }
      })
      .catch(err => {
        Alert.alert('Error', 'An unexpected error occurred.');
        console.error(err);
      });
  };

  const isProductOwner = currentUserEmail === productOwner?.email;

  const handleEditProduct = () => {
    if (!isProductOwner) {
      Alert.alert(
        'Unauthorized',
        'You are not authorized to edit this product.',
      );
      return;
    }

    navigation.navigate('EditProduct', {
      productId: _id,
      title,
      description,
      price,
      images,
      latitude,
      longitude,
      locationName,
    });
  };

  const handleDeleteProduct = async () => {
    if (!isProductOwner) {
      Alert.alert(
        'Unauthorized',
        'You are not authorized to delete this product.',
      );
      return;
    }

    Alert.alert(
      'Delete Confirmation',
      'Are you sure you want to delete this product?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await api.delete(`/api/products/${_id}`);
              if (response.status === 200) {
                Alert.alert('Success', 'Product deleted successfully.');
                navigation.goBack();
              } else {
                throw new Error('Failed to delete product.');
              }
            } catch (error) {
              console.error('Delete product error:', error);
              Alert.alert(
                'Error',
                'An unexpected error occurred while deleting the product.',
              );
            }
          },
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <ImageSlider
        images={formattedImages}
        onImageLongPress={image => {
          const imageUrl = `${image}`;
          handleLongPressImage(imageUrl);
        }}
      />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.priceLabel}>Price:</Text>
        <Text style={styles.price}>${price}</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.priceLabel}>Description:</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      {isProductOwner && (
        <View style={styles.ownerActionsContainer}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={handleEditProduct}>
            <Text style={styles.editButtonText}>Edit Product</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDeleteProduct}>
            <Text style={styles.deleteButtonText}>Delete Product</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Text style={styles.shareButtonText}>Share</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.iconTextContainer}>
        <TouchableOpacity
          style={styles.contactOwnerButton}
          onPress={handleContactOwner}>
          {theme === 'dark' ? (
            <MailIconRed height={26} width={26} />
          ) : (
            <MailIconBlue height={26} width={26} />
          )}
          <Text style={styles.contactOwnerText}>Contact owner</Text>
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
          userInterfaceStyle={theme === 'dark' ? 'dark' : 'light'}>
          <Marker
            coordinate={{
              latitude: latitude || 33.8886,
              longitude: longitude || 35.4955,
            }}
            title={locationName}
          />
        </MapView>
      </View>
    </ScrollView>
  );
};

export default Details;
