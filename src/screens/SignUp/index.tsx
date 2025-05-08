import React from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import { Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/stacks/RootStackParamList';
import styles from './styles';
import useSignUpForm, { SignUpFormInputs } from '../../utils/validation/useSignupForm';
import { useAuth } from '../../stores/AuthContext';

const SignUp = () => {
  const { register } = useAuth();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'SignUp'>>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useSignUpForm();

  const onSubmit = (data: SignUpFormInputs) => {
    const isRegistered = register({
      email: data.email,
      password: data.password,
      name: data.name,
      phoneNumber: data.phoneNumber,
    });

    if (isRegistered) {
      navigation.navigate('OTP', { email: data.email });
    } else {
      Alert.alert('Registration Failed', 'Email already exists.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        keyboardShouldPersistTaps="handled"
      >
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
                {errors.password && (
                  <Text style={styles.errorText}>{errors.password.message}</Text>
                )}
              </View>
            )}
          />

          <Controller
            control={control}
            name="phoneNumber"
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                  style={[styles.input, errors.phoneNumber && styles.errorInput]}
                  placeholder="Phone Number"
                  keyboardType="phone-pad"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                {errors.phoneNumber && (
                  <Text style={styles.errorText}>{errors.phoneNumber.message}</Text>
                )}
              </View>
            )}
          />

          <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default SignUp;
