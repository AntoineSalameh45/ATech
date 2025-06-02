import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const DEFAULT_LOCATION = {
  name: 'Default Location',
  latitude: 33.8886,
  longitude: 35.4955,
};

type MapPickerProps = {
  initialLocation?: { name: string; latitude: number; longitude: number };
  onSave: (location: { name: string; latitude: number; longitude: number }) => void;
  styles: any;
};

const MapPicker = ({ initialLocation = DEFAULT_LOCATION, onSave, styles }: MapPickerProps) => {
  const [mapVisible, setMapVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const onMapPress = (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ name: 'Selected Location', latitude, longitude });
  };

  const saveLocation = () => {
    onSave(selectedLocation);
    setMapVisible(false);
  };

  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={() => setMapVisible(true)}>
        <Text style={styles.saveButtonText}>
          {selectedLocation.name || 'Select Location'}
        </Text>
      </TouchableOpacity>

      <Modal visible={mapVisible} animationType="slide" onRequestClose={() => setMapVisible(false)}>
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
          <Marker coordinate={selectedLocation} title={selectedLocation.name} />
        </MapView>
        <View style={styles.mapButtons}>
          <TouchableOpacity style={styles.saveButton} onPress={saveLocation}>
            <Text style={styles.saveButtonText}>Save Location</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setMapVisible(false)}>
            <Text style={styles.saveButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default MapPicker;
