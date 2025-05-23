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
import ProductList from '../../components/organisims/ProductList/ProductList';
import {SectionHeader} from '../../components/atoms/SectionHeader';

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
    id?: string;
    firstName: string;
    lastName: string;
    profileImage?: {url: string};
  } | null>(null);

  const [products, setProducts] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

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

  const fetchUserProducts = async (userId: string) => {
    setLoadingProducts(true);
    try {
      const response = await api.get('/api/products');
      const allProducts = response.data.data.products;
      const userProducts = allProducts.filter((p: any) => p.userId === userId);
      setProducts(userProducts);
    } catch (err: any) {
      console.warn('Failed to fetch products:', err);
    } finally {
      setLoadingProducts(false);
    }
  };
  const onRefresh = async () => {
    setRefreshing(true);
    if (profile?.id) {
      await fetchUserProducts(profile.id);
    }
    setRefreshing(false);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (profile?.id) {
      fetchUserProducts(profile.id);
    }
  }, [profile?.id]);

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

      if (response.data.data.user.id) {
        fetchUserProducts(response.data.data.user.id);
      }
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
              !isEditing && styles.profileImageDisabled,
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
                placeholderTextColor={theme === 'dark' ? '#ccc' : '#666'}
              />
              <TextInput
                style={styles.nameInputMarginTop}
                value={profile.lastName}
                onChangeText={text => setProfile({...profile, lastName: text})}
                placeholder="Last Name"
                placeholderTextColor={theme === 'dark' ? '#ccc' : '#666'}
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
      <SectionHeader title="Your Products" theme={theme} />

      {loadingProducts && !refreshing ? (
        <View style={styles.loadingProductsContainer}>
          <ActivityIndicator size="small" color={styles.productPrice.color} />
        </View>
      ) : (
        <ProductList
          products={products}
          onProductPress={item => {
            Alert.alert('Product Selected', `You selected: ${item.title}`);
          }}
          refreshing={refreshing}
          onRefresh={onRefresh}
          styles={{
            listContainer: styles.productListContainer,
            productContainer: styles.productContainer,
            productImage: styles.productImage,
            productDetails: styles.productDetails,
            productTitle: styles.productTitle,
            productPrice: styles.productPrice,
          }}
          ListEmptyComponent={
            <View style={styles.noProductsContainer}>
              <Text style={styles.noProductsText}>
                No products found for this user.
              </Text>
              <Text style={styles.pullToRefreshText}>
                (Pull down to refresh)
              </Text>
            </View>
          }
          onEndReached={() => {}}
          isFetchingMore={false}
        />
      )}
    </View>
  );
};

export default ProfileScreen;
