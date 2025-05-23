import React, {useState} from 'react';
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
import {Controller} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/stacks/RootStackParamList';
import useSignUpForm, {
  SignUpFormInputs,
} from '../../utils/validation/useSignupForm';
import {signup} from '../../services/auth';
import { useTheme } from '../../stores/ThemeContext';
import getDynamicStyles from './styles';

const SignUp = () => {
  const {theme} = useTheme();
  const styles = getDynamicStyles(theme);
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'SignUp'>>();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useSignUpForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: SignUpFormInputs) => {
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);

    try {
      setIsSubmitting(true);
      const response = await signup(formData);
      if (response.success) {
        Alert.alert('Success', response.data.message);
        navigation.navigate('OTP', {email: data.email});
      } else {
        Alert.alert(
          'Error',
          response.data.message || 'Something went wrong. Please try again.',
        );
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Failed to register. Please try again.';
      Alert.alert('Error', errorMessage);
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
              name="firstName"
              render={({field: {onChange, onBlur, value}}) => (
                <View>
                  <Text style={styles.label}>First Name</Text>
                  <TextInput
                    style={[
                      styles.input,
                      errors.firstName && styles.errorInput,
                    ]}
                    placeholder="First Name"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                  {errors.firstName && (
                    <Text style={styles.errorText}>
                      {errors.firstName.message}
                    </Text>
                  )}
                </View>
              )}
            />

            <Controller
              control={control}
              name="lastName"
              render={({field: {onChange, onBlur, value}}) => (
                <View>
                  <Text style={styles.label}>Last Name</Text>
                  <TextInput
                    style={[styles.input, errors.lastName && styles.errorInput]}
                    placeholder="Last Name"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                  {errors.lastName && (
                    <Text style={styles.errorText}>
                      {errors.lastName.message}
                    </Text>
                  )}
                </View>
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({field: {onChange, onBlur, value}}) => (
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
                  {errors.email && (
                    <Text style={styles.errorText}>{errors.email.message}</Text>
                  )}
                </View>
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({field: {onChange, onBlur, value}}) => (
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
                  {errors.password && (
                    <Text style={styles.errorText}>
                      {errors.password.message}
                    </Text>
                  )}
                </View>
              )}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit(onSubmit)}
              disabled={isSubmitting}>
              <Text style={styles.buttonText}>
                {isSubmitting ? 'Submitting...' : 'Sign Up'}
              </Text>
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
