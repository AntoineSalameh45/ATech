import React from 'react';
import {Modal, View, TouchableOpacity, Text} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {MapModalProps} from './MapModal.type';
import {getDynamicStyles} from './styles';
import { useTheme } from '../../../stores/ThemeContext';

const MapModal = ({
  visible,
  onClose,
  onSave,
  onMapPress,
  selectedLocation,
}: MapModalProps) => {
  const {theme} = useTheme();
    const mapStyle = getDynamicStyles(theme);
  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <MapView
        style={mapStyle.container}
        initialRegion={{
          latitude: selectedLocation.latitude,
          longitude: selectedLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onPress={onMapPress}>
        <Marker coordinate={selectedLocation} />
      </MapView>
      <View style={mapStyle.mapButtons}>
        <TouchableOpacity style={mapStyle.saveButton} onPress={onSave}>
          <Text style={mapStyle.saveButtonText}>Save Location</Text>
        </TouchableOpacity>
        <TouchableOpacity style={mapStyle.cancelButton} onPress={onClose}>
          <Text style={mapStyle.saveButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default MapModal;
