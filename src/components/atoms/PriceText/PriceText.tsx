import React from 'react';
import {Text} from 'react-native';
import { iPriceTextProps } from './PriceText.type';
import styles from './styles';

const PriceText = ({price, style}: iPriceTextProps) => (
  <Text style={[styles.priceText, style]}>${price}</Text>
);

export default PriceText;
