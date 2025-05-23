import React from 'react';
import {View, Text} from 'react-native';
import getDynamicStyles from './styles';
import { SectionHeaderProps } from './SectionHeader.type';

const SectionHeader = ({title, theme}: SectionHeaderProps) => {
  const styles = getDynamicStyles(theme);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.underline} />
    </View>
  );
};


export default SectionHeader;
