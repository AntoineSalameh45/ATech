import {
  View,
  Text,
  Linking,
  SafeAreaView,
  StyleSheet,
  Pressable,
  Image,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {
  CameraIcon,
  CameraFlipIcon,
  CloseCircleIcon,
  FlashIcon,
  FlashOffIcon,
  RetakeIcon,
  SaveIcon,
} from '../../assets/svg';
import {getDynamicStyles} from './styles';
import {useTheme} from '../../stores/ThemeContext';

const hasAndroidPermission = async () => {
  if (Platform.OS !== 'android') {return true;}

  if (Platform.Version >= 33) {
    const statuses = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
    ]);
    return (
      statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
        PermissionsAndroid.RESULTS.GRANTED &&
      statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
        PermissionsAndroid.RESULTS.GRANTED
    );
  } else {
    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
    return status === PermissionsAndroid.RESULTS.GRANTED;
  }
};

const saveToGallery = async (
  uri: string,
  setImageUri: React.Dispatch<React.SetStateAction<string>>,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      Alert.alert(
        'Permission Denied',
        'Cannot save the photo without the required permissions.',
      );
      return;
    }

    const asset = await CameraRoll.save(uri, {
      type: 'photo',
      album: 'Captured Photos',
    });

    console.log('Saved Asset:', asset);
    Alert.alert('Photo Saved', 'Your photo has been saved successfully.');
    setImageUri('');
    setIsOpen(false);
  } catch (error) {
    console.error('Error saving photo:', error);
    Alert.alert('Error', 'Failed to save the photo. Please try again.');
  }
};


const CameraTest = () => {
  const {hasPermission, requestPermission} = useCameraPermission();
  const [cameraDevice, setCameraDevice] = useState<'back' | 'front'>('back');
  const device = useCameraDevice(cameraDevice);
  const camera = useRef<Camera>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [imageUri, setImageUri] = useState('');
  const {theme} = useTheme();
  const styles = getDynamicStyles(theme);

  const handleCameraPermissions = useCallback(async () => {
    const result = await requestPermission();
    console.log({result});
  }, [requestPermission]);

  useEffect(() => {
    handleCameraPermissions();
  }, [handleCameraPermissions]);

  const handleOnPress = async () => {
    try {
      const photo = await camera?.current?.takePhoto({flash: flashMode});
      const uri = `file://${photo?.path}`;
      setImageUri(uri);
      setIsOpen(false);
    } catch (error) {
      console.error('Error capturing photo:', error);
      Alert.alert('Error', 'Failed to capture the photo.');
    }
  };

  const openSettings = async () => {
    await Linking.openSettings();
  };

  const [flashMode, setFlashMode] = useState<'on' | 'off'>('off');
  const toggleFlash = () => {
    setFlashMode(prev => (prev === 'off' ? 'on' : 'off'));
  };

  const toggleCameraDevice = () => {
    setCameraDevice(prev => (prev === 'back' ? 'front' : 'back'));
  };

  const closeCamera = () => setIsOpen(false);

  const handleRetake = () => {
    setImageUri('');
    setIsOpen(true);
  };

  if (!hasPermission) {
    return (
      <SafeAreaView>
        <Text>
          Camera permission not granted{' '}
          <Text onPress={openSettings}>Open settings</Text>
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.viewContainer}>
      {!!imageUri && (
        <View style={StyleSheet.absoluteFill}>
          <Image source={{uri: imageUri}} style={styles.imageContainer} />
          <View style={styles.postPhotoButtonContainer}>
            <Pressable
              onPress={() => saveToGallery(imageUri, setImageUri, setIsOpen)}
              style={styles.saveButton}>
              <SaveIcon height={26} width={26} />
            </Pressable>
            <Pressable onPress={handleRetake} style={styles.saveButton}>
              <RetakeIcon height={26} width={26} />
            </Pressable>
          </View>
        </View>
      )}
      {!isOpen && !imageUri && (
        <View style={styles.cameraOpenButtonContainer}>
          <Pressable
            onPress={() => setIsOpen(true)}
            style={styles.cameraOpenButton}>
            <CameraIcon height={32} width={32} />
          </Pressable>
        </View>
      )}
      {isOpen && (
        <View style={StyleSheet.absoluteFill}>
          <Camera
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device!}
            isActive={true}
            photo
          />
          <View style={styles.buttonContainer}>
            <Pressable onPress={toggleFlash} style={styles.cameraButtons}>
              {flashMode === 'on' ? (
                <FlashIcon height={26} width={26} />
              ) : (
                <FlashOffIcon height={26} width={26} />
              )}
            </Pressable>
            <Pressable onPress={closeCamera} style={styles.cameraButtons}>
              <CloseCircleIcon height={32} width={32} />
            </Pressable>
          </View>
          <View style={styles.shutterContainer}>
            <Pressable onPress={handleOnPress} style={styles.shutterButton} />
          </View>
          <Pressable onPress={toggleCameraDevice} style={styles.camFlipButton}>
            <CameraFlipIcon height={32} width={32} />
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
};

export default CameraTest;
