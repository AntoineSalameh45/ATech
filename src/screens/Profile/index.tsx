import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import type {CompositeNavigationProp} from '@react-navigation/native';
import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import type {StackNavigationProp} from '@react-navigation/stack';
import getDynamicStyles from './styles';
import {useTheme} from '../../stores/ThemeContext';
import {CustomModal} from '../../components/molecules/CustomModal';
import {AuthStore} from '../../stores/AuthStore';
import api from '../../services/api';
import {globalStyles} from '../../styles/globalStyles';

type AuthStackParamList = {
  Camera: {onPhotoTaken: (photoUri: string) => void};
};

type MainNavigatorParamList = {
  Profile: {userId?: string};
  AuthStack: undefined;
};

type NavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainNavigatorParamList, 'Profile'>,
  StackNavigationProp<AuthStackParamList>
>;

const ProfileScreen = () => {
  const {theme} = useTheme();
  const styles = getDynamicStyles(theme);
  const globalDynamicStyles = globalStyles(theme);
  const navigation = useNavigation<NavigationProp>();
  const clearTokens = AuthStore(state => state.clearTokens);

  const [profile, setProfile] = useState<{
    firstName: string;
    lastName: string;
    profileImage?: {url: string};
  } | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const fetchProfile = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get('api/user/profile');
      setProfile(response.data.data.user);
      setPhotoUri(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch profile');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSave = async () => {
    if (!profile || !profile.firstName.trim() || !profile.lastName.trim()) {
      Alert.alert('Error', 'First Name and Last Name cannot be empty.');
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      const formData = new FormData();

      formData.append('firstName', profile.firstName);
      formData.append('lastName', profile.lastName);

      if (photoUri && !photoUri.startsWith('http')) {
        let uploadUri = photoUri;
        if (Platform.OS === 'ios' && !uploadUri.startsWith('file://')) {
          uploadUri = 'file://' + uploadUri;
        }

        const filename =
          uploadUri.split('/').pop() || `photo_${Date.now()}.jpg`;
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1].toLowerCase()}` : 'image/jpeg';

        formData.append('profileImage', {
          uri: uploadUri,
          type,
          name: filename,
        } as any);
      }

      const response = await api.put('api/user/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setProfile(response.data.data.user);
      setPhotoUri(null);
      setIsEditing(false);
      Alert.alert('Success', 'Profile updated successfully');
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || 'Failed to update profile';
      setError(errorMessage);
      Alert.alert('Error', errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    clearTokens();
    setLogoutModalVisible(false);
    console.log('User logged out!');
  };

  if (isLoading) {
    return (
      <View style={globalDynamicStyles.centeredView}>
        <Text style={styles.nameText}>Loading profile...</Text>
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={globalDynamicStyles.centeredView}>
        <Text style={globalDynamicStyles.errorText}>
          Profile data not available.
        </Text>
        <TouchableOpacity
          style={globalDynamicStyles.retryButton}
          onPress={fetchProfile}>
          <Text style={globalDynamicStyles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

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
              launchImageLibrary({mediaType: 'photo'}, response => {
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

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => isEditing && setModalVisible(true)}
          disabled={!isEditing}>
          <Image
            source={
              photoUri
                ? {uri: photoUri}
                : profile?.profileImage?.url
                ? {uri: profile.profileImage.url}
                : require('../../assets/profile-placeholder.png')
            }
            style={[
              styles.profileImage,
              !isEditing && {opacity: 0.6},
            ]}
          />
        </TouchableOpacity>

        <View style={styles.details}>
          {isEditing ? (
            <>
              <TextInput
                style={styles.nameInput}
                value={profile.firstName}
                onChangeText={text => setProfile({...profile, firstName: text})}
                placeholder="First Name"
              />
              <TextInput
                style={[styles.nameInput, {marginTop: 10}]}
                value={profile.lastName}
                onChangeText={text => setProfile({...profile, lastName: text})}
                placeholder="Last Name"
              />
            </>
          ) : (
            <Text style={styles.nameText}>
              {profile.firstName} {profile.lastName}
            </Text>
          )}
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={isEditing ? handleSave : () => setIsEditing(true)}
          disabled={isSaving}>
          {isSaving ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.editButtonText}>
              {isEditing ? 'Save' : 'Edit'}
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => setLogoutModalVisible(true)}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {error && (
        <View style={globalDynamicStyles.centeredView}>
          <Text style={globalDynamicStyles.errorText}>{error}</Text>
          <TouchableOpacity
            style={globalDynamicStyles.retryButton}
            onPress={() => {
              setIsLoading(true);
              fetchProfile();
            }}>
            <Text style={globalDynamicStyles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ProfileScreen;
