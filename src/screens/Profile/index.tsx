import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
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

  const [profile, setProfile] = useState<any>(null);
  const [savedName, setSavedName] = useState('John Doe');
  const [isEditing, setIsEditing] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const fetchProfile = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const endpoint = 'api/user/profile';
      const response = await api.get(endpoint);
      setProfile(response.data.data.user);
      setSavedName(
        `${response.data.data.user.firstName} ${response.data.data.user.lastName}`,
      );
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch profile');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSave = () => {
    setIsEditing(false);
    setSavedName(
      profile ? profile.firstName + ' ' + profile.lastName : savedName,
    );
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
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image
            source={
              photoUri
                ? {uri: photoUri}
                : profile?.profileImage?.url
                ? {uri: profile.profileImage.url}
                : require('../../assets/profile-placeholder.png')
            }
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <View style={styles.details}>
          {isEditing ? (
            <TextInput
              style={styles.nameInput}
              value={
                profile ? `${profile.firstName} ${profile.lastName}` : savedName
              }
              onChangeText={text => {
                const [firstName, lastName] = text.split(' ');
                if (profile) {
                  setProfile({...profile, firstName, lastName});
                } else {
                  setSavedName(text);
                }
              }}
            />
          ) : (
            <Text style={styles.nameText}>
              {profile ? `${profile.firstName} ${profile.lastName}` : savedName}
            </Text>
          )}
        </View>
      </View>

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
