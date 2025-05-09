import React from 'react';
import {View, TextInput} from 'react-native';
import { useTheme } from '../../../stores/ThemeContext';
import getStyles from './styles';

const SearchBar = () => {
  const {theme} = useTheme();
  const styles = getStyles(theme);
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        placeholderTextColor="#888888"
      />
    </View>
  );
};

export default SearchBar;
