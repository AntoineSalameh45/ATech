import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Controller } from 'react-hook-form';
import { ProductFormProps } from './ProductForm.type';
import errorStyles from './styles';

const ProductForm = ({ form, styles, onSelectLocation }: ProductFormProps) => {
  const {
    control,
    formState: { errors },
  } = form;

  const getErrorMessage = (error: any): string | undefined => {
    return error?.message ? String(error.message) : undefined;
  };

  return (
    <View>
      <Text style={styles.label}>Title</Text>
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Enter product title"
            placeholderTextColor="#888888"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={[styles.input, errors.title && errorStyles.errorBorder]}
          />
        )}
      />
      {errors.title && (
        <Text style={errorStyles.errorText}>
          {getErrorMessage(errors.title)}
        </Text>
      )}

      <Text style={styles.label}>Description</Text>
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Enter product description"
            placeholderTextColor="#888888"
            multiline
            numberOfLines={4}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={[styles.input, errors.description && errorStyles.errorBorder]}
          />
        )}
      />
      {errors.description && (
        <Text style={errorStyles.errorText}>
          {getErrorMessage(errors.description)}
        </Text>
      )}

      <Text style={styles.label}>Price</Text>
      <Controller
        control={control}
        name="price"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Enter price"
            placeholderTextColor="#888888"
            keyboardType="decimal-pad"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={[styles.input, errors.price && errorStyles.errorBorder]}
          />
        )}
      />
      {errors.price && (
        <Text style={errorStyles.errorText}>
          {getErrorMessage(errors.price)}
        </Text>
      )}

      <Text style={styles.label}>Location (optional)</Text>
      <TouchableOpacity style={styles.button} onPress={onSelectLocation}>
        <Text style={styles.label}>Select Location on Map</Text>
      </TouchableOpacity>
      <Controller
        control={control}
        name="location"
        render={({ field: { value } }) => (
          <TextInput
            value={value}
            editable={false}
            multiline
            style={[styles.input, errors.location && errorStyles.errorBorder]}
          />
        )}
      />
    </View>
  );
};

export default ProductForm;
