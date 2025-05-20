import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { StackNavigationProp } from '@react-navigation/stack';
import getDynamicStyles from './styles';
import { useTheme } from '../../stores/ThemeContext';
import { CustomModal } from '../../components/molecules/CustomModal';

type AuthStackParamList = {
  Camera: { onPhotoTaken: (photoUri: string) => void };
};

type MainNavigatorParamList = {
  Profile: undefined;
  AuthStack: undefined;
};

type NavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainNavigatorParamList, 'Profile'>,
  StackNavigationProp<AuthStackParamList>
>;

const ProfileScreen = () => {
  const { theme } = useTheme();
  const styles = getDynamicStyles(theme);
  const [name, setName] = useState('John Doe');
  const [savedName, setSavedName] = useState('John Doe');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    navigation.setOptions({ title: savedName });
  }, [navigation, savedName]);

  const handleEditPhoto = () => setModalVisible(true);

  const handleSave = () => {
    setIsEditing(false);
    setSavedName(name);
  };

  const handleLogout = () => {
    console.log('User logged out!');
    setLogoutModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <CustomModal
        visible={modalVisible}
        title="Change Photo"
        message="Choose an option to update your profile photo."
        options={[
          {
            text: 'Take Photo',
            onPress: () => {
              navigation.navigate('Camera', {
                onPhotoTaken: (photoUri: string) => setPhotoUri(photoUri),
              });
              setModalVisible(false);
            },
          },
          {
            text: 'Choose from Library',
            onPress: () => {
              launchImageLibrary({ mediaType: 'photo' }, (response) => {
                if (response.assets && response.assets.length > 0) {
                  const uri = response.assets[0].uri;
                  setPhotoUri(uri || null);
                }
              });
              setModalVisible(false);
            },
          },
          {
            text: 'Cancel',
            onPress: () => setModalVisible(false),
          },
        ]}
        onClose={() => setModalVisible(false)}
      />

      <CustomModal
        visible={logoutModalVisible}
        title="Confirm Logout"
        message="Are you sure you want to log out?"
        options={[
          {
            text: 'Logout',
            onPress: handleLogout,
          },
          {
            text: 'Cancel',
            onPress: () => setLogoutModalVisible(false),
          },
        ]}
        onClose={() => setLogoutModalVisible(false)}
      />

      {/* Profile Content */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleEditPhoto} style={styles.imageWrapper}>
          <Image
            source={
              photoUri
                ? { uri: photoUri }
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
            <Text style={styles.nameText}>{savedName}</Text>
          )}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={isEditing ? handleSave : () => setIsEditing(true)}
            >
              <Text style={styles.editButtonText}>
                {isEditing ? 'Save' : 'Edit'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={() => setLogoutModalVisible(true)}
            >
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;
