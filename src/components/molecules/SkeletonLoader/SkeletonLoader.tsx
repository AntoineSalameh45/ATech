import React from 'react';
import {View} from 'react-native';
import getDynamicStyles from './styles';
import {useTheme} from '../../../stores/ThemeContext';

const SkeletonLoader = () => {
  const {theme} = useTheme();
  const styles = getDynamicStyles(theme);

  return (
    <View style={styles.skeletonContainer}>
      <View style={[styles.skeletonItem, styles.skeletonImage]} />
      <View style={[styles.skeletonItem, styles.skeletonText]} />
      <View style={[styles.skeletonItem, styles.skeletonPrice]} />
    </View>
  );
};

export default SkeletonLoader;
