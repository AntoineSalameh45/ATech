import React from 'react';
import {View, Image, TouchableOpacity, Text, Alert} from 'react-native';
import { ImagePickerProps } from './ImagePicker.type';
import { useTheme } from '../../../stores/ThemeContext';
import { getDynamicStyles } from './styles';

const ImagePicker = ({images, onAddImage, onRemoveImage, onOpenCamera}: ImagePickerProps) => {
  const {theme} = useTheme();
    const styles = getDynamicStyles(theme);
  return (
    <View>
      <Text style={styles.selectedImagesText}>Selected Images ({images.length} / 5)</Text>
      <View style={styles.imagesContainer}>
        {images.map((img, idx) => (
          <View key={idx} style={styles.imageWrapper}>
            <Image source={{uri: img.uri}} style={styles.image} />
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => {
                Alert.alert(
                  'Remove Image',
                  'Are you sure you want to remove this image?',
                  [
                    {text: 'Cancel', style: 'cancel'},
                    {text: 'Remove', onPress: () => onRemoveImage(idx)},
                  ],
                );
              }}>
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View><View style={styles.buttonRow}>
        <TouchableOpacity
          style={[
            styles.button,
            styles.buttonPrimary,
            images.length >= 5 && styles.buttonDisabled,
          ]}
          onPress={onAddImage}
          disabled={images.length >= 5}>
          <Text style={styles.buttonText}>
            {images.length >= 5 ? 'Max 5 images selected' : 'Pick Images'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            styles.buttonPrimary,
            images.length >= 5 && styles.buttonDisabled,
          ]}
          onPress={onOpenCamera}
          disabled={images.length >= 5}>
          <Text style={styles.buttonText}>Open Camera</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ImagePicker;

