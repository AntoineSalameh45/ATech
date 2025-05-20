import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useTheme } from '../../../stores/ThemeContext';
import { getDynamicStyles } from './styles';
import { iCustomModalProps } from './CustomModal.type';

const { width } = Dimensions.get('window');

const CustomModal = ({
  visible,
  title,
  message,
  options,
  onClose,
}: iCustomModalProps) => {
  const { theme } = useTheme();
  const styles = getDynamicStyles(theme);

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          {message && <Text style={styles.message}>{message}</Text>}
          <View style={styles.buttonContainer}>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.button, { width: width * 0.5 }]}
                onPress={() => {
                  option.onPress();
                  onClose();
                }}
              >
                <Text style={styles.buttonText}>{option.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
