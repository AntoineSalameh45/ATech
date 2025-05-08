import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import styles from './styles';
import { RootStackParamList } from '../../navigation/stacks/RootStackParamList';
import { useAuth } from '../../stores/AuthContext';

const OTPScreen = () => {
  const [otp, setOtp] = useState('');
  const { setAuthenticated } = useAuth();
  const route = useRoute<RouteProp<RootStackParamList, 'OTP'>>();
  const { email } = route.params || {};

  const handleOTPSubmit = () => {
    if (/^\d{4}$/.test(otp)) {
      Alert.alert('OTP Verified', `Welcome, ${email}!`, [
        {
          text: 'OK',
          onPress: () => setAuthenticated(true), // Trigger navigation to AuthStack
        },
      ]);
    } else {
      Alert.alert('Invalid OTP', 'Please enter a valid 4-digit OTP.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Enter OTP</Text>

        <Text style={styles.subtitle}>
          We’ve sent a verification code to your phone for {email}.
        </Text>
        <Text style={styles.notice}>
          (For testing, any 4-digit number will work.)
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter OTP"
          keyboardType="numeric"
          maxLength={4}
          value={otp}
          onChangeText={setOtp}
        />

        <TouchableOpacity style={styles.button} onPress={handleOTPSubmit}>
          <Text style={styles.buttonText}>Verify OTP</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default OTPScreen;
