import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';

const HeaderRight = ({
  theme,
  toggleTheme,
}: {
  theme: string;
  toggleTheme: () => void;
}) => {
  const saberColors =
    theme === 'light' ? ['#00FFFF', '#007FFF'] : ['#FF0000', '#FF4500'];
  const saberGlowColor = theme === 'light' ?  '#00FFFF' : '#FF4500';

  return (
    <View style={[styles.glowContainer, { shadowColor: saberGlowColor }]}>
      <LinearGradient
        colors={saberColors}
        style={styles.gradientContainer}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <TouchableOpacity onPress={toggleTheme} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>
            {theme === 'light' ? 'Jedi Path' : 'Dark Side'}
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

export default HeaderRight;
