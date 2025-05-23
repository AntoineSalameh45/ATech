import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native';
import styles from './styles';
import { RootStackParamList } from '../../navigation/stacks/RootStackParamList';
import { verifyOTP, resendOTP } from '../../services/auth';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'OTP'>;

const OTPScreen = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const route = useRoute<RouteProp<RootStackParamList, 'OTP'>>();
  const navigation = useNavigation<NavigationProp>();
  const { email } = route.params || {};

  const inputs = useRef<TextInput[]>([]);

  const handleChange = (text: string, index: number) => {
    if (!/^\d*$/.test(text)) {return;}

    const newOtp = [...otp];
    newOtp[index] = text;

    setOtp(newOtp);

    if (text && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const otpString = otp.join('');

  const handleOTPSubmit = async () => {
    if (otpString.length !== 6) {
      Alert.alert('Invalid OTP', 'Please enter a valid 6-digit OTP.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await verifyOTP({ email, otp: otpString });
      if (response.success) {
        Alert.alert('Success', response.data.message, [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login'),
          },
        ]);
      } else {
        Alert.alert(
          'Error',
          response.data.message || 'Invalid OTP. Please try again.'
        );
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Failed to verify OTP. Please try again.';
      Alert.alert('Error', errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOTP = async () => {
    setIsResending(true);
    try {
      const response = await resendOTP({ email });
      if (response.success) {
        Alert.alert('Success', response.data.message);
        setOtp(['', '', '', '', '', '']);
        inputs.current[0].focus();
      } else {
        Alert.alert(
          'Error',
          response.data.message || 'Failed to resend OTP. Please try again.'
        );
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Failed to resend OTP. Please try again.';
      Alert.alert('Error', errorMessage);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Enter OTP</Text>
        <Text style={styles.subtitle}>
          We’ve sent a verification code to your email: {email}
        </Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                if (ref) {inputs.current[index] = ref;}
              }}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              style={styles.otpInput}
              textAlign="center"
              autoFocus={index === 0}
              returnKeyType="done"
              importantForAutofill="no"
            />
          ))}
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleOTPSubmit}
          disabled={isSubmitting}>
          <Text style={styles.buttonText}>
            {isSubmitting ? 'Verifying...' : 'Verify OTP'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={handleResendOTP}
          disabled={isResending}>
          <Text style={styles.secondaryButtonText}>
            {isResending ? 'Resending...' : 'Resend code'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default OTPScreen;
