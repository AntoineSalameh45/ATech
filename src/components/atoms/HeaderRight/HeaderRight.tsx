import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './styles';

const HeaderRight = ({
  theme,
  toggleTheme,
}: {
  theme: string;
  toggleTheme: () => void;
}) => {
  const glyph = theme === 'light' ? '\u0024' : '\u0023';
  const color = theme === 'light' ? '#00FFFF' : '#FF4500';
  const textShadowColor = theme === 'light' ? 'rgba(0, 255, 255, 0.6)' : 'rgba(255, 69, 0, 0.6)';

  return (
    <TouchableOpacity onPress={toggleTheme} style={styles.characterButton}>
      <Text
        style={[
          styles.characterText,
          { color: color, textShadowColor: textShadowColor },
        ]}
      >
        {glyph}
      </Text>
    </TouchableOpacity>
  );
};

export default HeaderRight;
