import {
  View,
  Text,
  Linking,
  SafeAreaView,
  StyleSheet,
  Pressable,
  Image,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faCameraRotate} from '@fortawesome/free-solid-svg-icons';
import {faCircleXmark} from '@fortawesome/free-solid-svg-icons';
import {faCamera} from '@fortawesome/free-solid-svg-icons';
import {FlashIcon, FlashOffIcon} from '../../assets/svg';
import {getDynamicStyles} from './styles';
import {useTheme} from '../../stores/ThemeContext';

library.add(faCamera, faCameraRotate, faCircleXmark);

const CameraTest = () => {
  const {hasPermission, requestPermission} = useCameraPermission();

  const [cameraDevice, setCameraDevice] = useState<'back' | 'front'>('back');
  const device = useCameraDevice(cameraDevice);
  const camera = useRef<Camera>(null);

  const [isOpen, setIsOpen] = useState(false);
  const closeCamera = () => setIsOpen(false);
  const toggleCameraDevice = () => {
    const newDevice = cameraDevice === 'back' ? 'front' : 'back';
    setCameraDevice(newDevice);
  };

  const [imageUri, setImageUri] = useState('');

  const handleCameraPermissions = useCallback(async () => {
    const result = await requestPermission();
    console.log({result});
  }, [requestPermission]);

  useEffect(() => {
    handleCameraPermissions();
  }, [handleCameraPermissions]);

  const openSettings = async () => {
    await Linking.openSettings();
  };
  const [flashMode, setFlashMode] = useState<'on' | 'off'>('off');
  const [flashHintVisible, setFlashHintVisible] = useState(false);

  const toggleFlash = () => {
    setFlashMode(prev => (prev === 'off' ? 'on' : 'off'));
    setFlashHintVisible(true);

    setTimeout(() => {
      setFlashHintVisible(false);
    }, 2000);
  };

  const handleOnpress = async () => {
    const photo = await camera?.current?.takePhoto({flash: flashMode});
    setImageUri(`file://${photo?.path}`);
    setIsOpen(false);

    console.log(photo);
  };

  const {theme} = useTheme();
  const styles = getDynamicStyles(theme);

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
        <Image source={{uri: imageUri}} style={styles.imageContainer} />
      )}
      {!isOpen && (
        <View style={styles.cameraOpenButtonContainer}>
          <Pressable
            onPress={() => setIsOpen(true)}
            style={styles.cameraOpenButton}>
            <FontAwesomeIcon
              icon={faCamera}
              size={32}
              color={theme === 'light' ? '#050505dd' : '#fefefedd'}
            />
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
            <View style={styles.flashContainer}>
              <Pressable onPress={toggleFlash} style={styles.cameraButtons}>
                {flashMode === 'on' ? (
                  <FlashIcon height={26} width={26} />
                ) : (
                  <FlashOffIcon height={26} width={26} />
                )}
              </Pressable>
              {flashHintVisible && (
                <View style={styles.flashHintContainer}>
                  <Text style={styles.flashHintText}>
                    {flashMode === 'on' ? 'Flash is On' : 'Flash is Off'}
                  </Text>
                </View>
              )}
            </View>

            <Pressable onPress={closeCamera} style={styles.cameraButtons}>
              <FontAwesomeIcon
                icon={faCircleXmark}
                style={styles.buttonStyle}
                size={32}
              />
            </Pressable>
          </View>

          <View style={styles.shutterContainer}>
            <Pressable onPress={handleOnpress} style={styles.shutterButton} />
          </View>

          <Pressable onPress={toggleCameraDevice} style={styles.camFlipButton}>
            <FontAwesomeIcon
              icon={faCameraRotate}
              style={styles.buttonStyle}
              size={32}
            />
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
};

export default CameraTest;
