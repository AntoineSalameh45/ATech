import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import getDynamicStyles from './styles';
import {useTheme} from '../../stores/ThemeContext';

type RootStackParamList = {
  Profile: undefined;
  Camera: {onPhotoTaken: (photoUri: string) => void};
};

const ProfileScreen = () => {
  const {theme} = useTheme();
  const styles = getDynamicStyles(theme);
  const [name, setName] = useState('John Doe');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleEditPhoto = () => {
    Alert.alert('Change Photo', 'Choose an option', [
      {
        text: 'Take Photo',
        onPress: () => {
          navigation.navigate('Camera', {
            onPhotoTaken: (photoUri: string) => setPhotoUri(photoUri),
          });
        },
      },
      {
        text: 'Choose from Library',
        onPress: () => {
          launchImageLibrary(
            {
              mediaType: 'photo',
            },
            response => {
              if (response.didCancel) {
                console.log('User cancelled image picker');
              } else if (response.errorMessage) {
                console.error(response.errorMessage);
              } else if (response.assets && response.assets.length > 0) {
                const uri = response.assets[0].uri;
                if (uri) {
                  setPhotoUri(uri);
                } else {
                  setPhotoUri(null);
                }
              }
            },
          );
        },
      },
      {text: 'Cancel', style: 'cancel'},
    ]);
  };

  const handleSave = () => {
    setIsEditing(false);
    Alert.alert('Profile Updated', `Your name has been updated to "${name}"`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleEditPhoto} style={styles.imageWrapper}>
          <Image
            source={
              photoUri
                ? {uri: photoUri}
                : require('../../assets/profile-placeholder.png')
            }
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <View style={styles.details}>
          {isEditing ? (
            <TextInput
              style={styles.nameInput}
              value={name}
              onChangeText={setName}
            />
          ) : (
            <Text style={styles.nameText}>{name}</Text>
          )}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={isEditing ? handleSave : () => setIsEditing(true)}>
              <Text style={styles.editButtonText}>
                {isEditing ? 'Save' : 'Edit'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={isEditing ? handleSave : () => setIsEditing(true)}>
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;
