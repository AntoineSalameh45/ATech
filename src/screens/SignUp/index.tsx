import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/stacks/RootStackParamList';
import styles from './styles';
import useSignUpForm, { SignUpFormInputs } from '../../utils/validation/useSignupForm';
import { signup } from '../../services/auth';

const SignUp = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'SignUp'>>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useSignUpForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: SignUpFormInputs) => {
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('firstName', data.name.split(' ')[0]);
    formData.append('lastName', data.name.split(' ').slice(1).join(' '));
    // Append profileImage if implemented
    // if (profileImage) formData.append('profileImage', { uri: profileImage, name: 'photo.jpg', type: 'image/jpeg' });

    try {
      setIsSubmitting(true);
      const response = await signup(formData);
      if (response.success) {
        Alert.alert('Success', 'User created successfully. Please check your email for verification.');
        navigation.navigate('OTP', { email: data.email });
      } else {
        Alert.alert('Error', 'Something went wrong. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to register. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContainer}
          keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            <Text style={styles.title}>Welcome to ATech</Text>

            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <Text style={styles.label}>Name</Text>
                  <TextInput
                    style={[styles.input, errors.name && styles.errorInput]}
                    placeholder="Name"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                  {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}
                </View>
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <Text style={styles.label}>Email</Text>
                  <TextInput
                    style={[styles.input, errors.email && styles.errorInput]}
                    placeholder="Email"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    keyboardType="email-address"
                  />
                  {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
                </View>
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <Text style={styles.label}>Password</Text>
                  <TextInput
                    style={[styles.input, errors.password && styles.errorInput]}
                    placeholder="Password"
                    secureTextEntry
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                  {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
                </View>
              )}
            />


            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit(onSubmit)}
              disabled={isSubmitting}>
              <Text style={styles.buttonText}>{isSubmitting ? 'Submitting...' : 'Sign Up'}</Text>
            </TouchableOpacity>

            <View style={styles.signupTextContainer}>
              <Text style={styles.signupText}>
                Already have an account?{' '}
                <Text
                  style={styles.signupLink}
                  onPress={() => navigation.navigate('Login')}>
                  Login
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
