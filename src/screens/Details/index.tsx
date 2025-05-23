import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Linking,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {RouteProp} from '@react-navigation/native';
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

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

type Props = {
  route: DetailsScreenRouteProp;
};

const Details = ({route}: Props) => {
  const {title, description, price, images, latitude, longitude, _id, user, locationName} =
    route.params;
  const {theme} = useTheme();
  const styles = getDynamicStyles(theme);
  const {addItem} = useCartStore();

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

  const handleLongPressImage = (imageUrl: string) => {
    Alert.alert(
      'Save Image',
      'Do you want to save this image to your gallery?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              if (Platform.OS === 'android' && Platform.Version < 33) {
                const hasPermission = await PermissionsAndroid.request(
                  PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                );

                if (hasPermission !== PermissionsAndroid.RESULTS.GRANTED) {
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

              await CameraRoll.saveAsset(imagePath, {type: 'photo', album: 'ATech'});

              Alert.alert('Success', 'Image saved to gallery!');
            } catch (error) {
              Alert.alert('Error', 'Failed to save image.');
              console.error('Save image error:', error);
            }
          },
        },
      ],
    );
  };

  const handleContactOwner = () => {
    const email = user?.email;
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

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <ImageSlider
        images={formattedImages}
        onImageLongPress={image => {
          const imageUrl = `${image}`;
          console.log('Long-pressed image URL:', imageUrl);
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
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareButton}>
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
