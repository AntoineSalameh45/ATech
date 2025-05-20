import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useAuth} from '../../stores/AuthContext';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/stacks/RootStackParamList';
import {
  loginSchema,
  LoginFormInputs,
} from '../../utils/validation/useLoginForm';

const LoginScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {login} = useAuth();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (data: LoginFormInputs) => {
    setIsLoading(true);
    setErrorMessage('');

    setTimeout(async () => {
      try {
        const isSuccess = await login(data.email, data.password);

        if (isSuccess) {
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        } else {
          setTimeout(() => {
            setIsLoading(false);
            setErrorMessage('Invalid email or password.');
          }, 1000);
        }
      } catch (error) {
        setIsLoading(false);
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    }, 2000);
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.description}>
            Login to browse through all your tech needs
          </Text>

          <Controller
            control={control}
            name="email"
            render={({field: {onChange, onBlur, value}}) => (
              <View>
                <TextInput
                  style={[styles.input, errors.email && styles.errorInput]}
                  placeholder="example@example.com"
                  placeholderTextColor="#888888"
                  onBlur={onBlur}
                  onChangeText={text => onChange(text.toLowerCase())}
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
                <TextInput
                  style={[styles.input, errors.password && styles.errorInput]}
                  placeholder="Password"
                  placeholderTextColor="#888888"
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

          {errorMessage !== '' && (
            <Text style={styles.errorText}>{errorMessage}</Text>
          )}

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.loginButtonText}>Login</Text>
            )}
          </TouchableOpacity>

          <View style={styles.signupTextContainer}>
            <Text style={styles.signupText}>
              Don't have an account?{' '}
              <Text
                style={styles.signupLink}
                onPress={() => navigation.navigate('SignUp')}>
                Sign Up
              </Text>
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
