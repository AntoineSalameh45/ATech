import React from 'react';
import {View, TextInput} from 'react-native';
import styles from './styles';

const SearchBar = () => {
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
