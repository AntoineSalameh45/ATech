import React from 'react';
import {render, fireEvent, act, waitFor} from '@testing-library/react-native';
import {ImageSlider} from './index';

const images = [
  {url: 'https://example.com/image1.jpg'},
  {url: 'https://example.com/image2.jpg'},
  {url: 'https://example.com/image3.jpg'},
];

describe('ImageSlider', () => {
  it('renders all images', () => {
    const {getAllByTestId} = render(<ImageSlider images={images} />);
    expect(getAllByTestId('slider-image').length).toBe(images.length);
  });

  it('renders pagination dots', () => {
    const {getAllByTestId} = render(<ImageSlider images={images} />);
    expect(getAllByTestId('pagination-dot').length).toBe(images.length);
  });

  it('calls onImagePress when image is tapped', async () => {
    const onImagePress = jest.fn();
    const {getAllByTestId} = render(
      <ImageSlider images={images} onImagePress={onImagePress} />,
    );
    const imagePressable = getAllByTestId('slider-image-pressable')[0];
    act(() => {
      fireEvent(imagePressable, 'onPressIn');
      fireEvent(imagePressable, 'onTouchStart', {
        nativeEvent: {pageX: 0, pageY: 0},
      });
      fireEvent(imagePressable, 'onPressOut', {
        nativeEvent: {pageX: 0, pageY: 0},
      });
    });
    await waitFor(() => {
      expect(onImagePress).toHaveBeenCalledWith(images[0].url);
    });
  }, 10000);

  it('calls onImageLongPress when image is long pressed', () => {
    const onImageLongPress = jest.fn();
    const {getAllByTestId} = render(
      <ImageSlider images={images} onImageLongPress={onImageLongPress} />,
    );
    const imagePressable = getAllByTestId('slider-image-pressable')[1];
    act(() => {
      fireEvent(imagePressable, 'onLongPress');
    });
    expect(onImageLongPress).toHaveBeenCalledWith(images[1].url);
  });

  it('does not call onImagePress if swipe is detected', () => {
    const onImagePress = jest.fn();
    const {getAllByTestId} = render(
      <ImageSlider images={images} onImagePress={onImagePress} />,
    );
    const imagePressable = getAllByTestId('slider-image-pressable')[0];
    act(() => {
      fireEvent(imagePressable, 'onTouchStart', {
        nativeEvent: {pageX: 0, pageY: 0},
      });
      fireEvent(imagePressable, 'onTouchStart', {
        nativeEvent: {pageX: 0, pageY: 0},
      });
      fireEvent.press(imagePressable);
    });
    expect(onImagePress).not.toHaveBeenCalled();
  });
});
