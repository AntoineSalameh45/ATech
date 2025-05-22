import React, { useState } from 'react';
import { TextInput, View } from 'react-native';
import { useTheme } from '../../../stores/ThemeContext';
import getStyles from './styles';

type SearchBarProps = {
  onSearch: (query: string) => void;
};

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const [searchText, setSearchText] = useState('');

  const handleSearch = (text: string) => {
    setSearchText(text);
    onSearch(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        placeholderTextColor="#888888"
        value={searchText}
        onChangeText={handleSearch}
      />
    </View>
  );
};

export default SearchBar;
