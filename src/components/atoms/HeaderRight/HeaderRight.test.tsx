import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react-native';
import HeaderRight from './HeaderRight';

describe('HeaderRight Component', () => {

  describe('HeaderRight Component', () => {
    const mockToggleTheme = jest.fn();

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('renders the correct glyph for the light theme', () => {
      render(<HeaderRight theme="light" toggleTheme={mockToggleTheme} />);
      const buttonText = screen.getByText('$'); // '\u0024' for the light theme
      expect(buttonText).toBeTruthy();
      expect(buttonText.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({color: '#00FFFF'}),
          expect.objectContaining({textShadowColor: 'rgba(0, 255, 255, 0.6)'}),
        ]),
      );
    });

    it('renders the correct glyph for the dark theme', () => {
      render(<HeaderRight theme="dark" toggleTheme={mockToggleTheme} />);
      const buttonText = screen.getByText('#'); // '\u0023' for the dark theme
      expect(buttonText).toBeTruthy();
      expect(buttonText.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({color: '#FF4500'}),
          expect.objectContaining({textShadowColor: 'rgba(255, 69, 0, 0.6)'}),
        ]),
      );
    });

    it('calls toggleTheme when the Pressable is pressed', () => {
      render(<HeaderRight theme="light" toggleTheme={mockToggleTheme} />);
      const pressable = screen.getByTestId('header-right-button');
      fireEvent.press(pressable);
      expect(mockToggleTheme).toHaveBeenCalledTimes(1);
    });

    it('does not call toggleTheme when not pressed', () => {
      render(<HeaderRight theme="light" toggleTheme={mockToggleTheme} />);
      expect(mockToggleTheme).not.toHaveBeenCalled();
    });

    it('renders TouchableOpacity with correct style', () => {
      render(<HeaderRight theme="light" toggleTheme={mockToggleTheme} />);
      const button = screen.getByTestId('header-right-button');
      expect(button.props.style).toBeDefined();
    });

    it('renders with different theme values', () => {
      render(<HeaderRight theme="unknown" toggleTheme={mockToggleTheme} />);
      expect(screen.getByText('#')).toBeTruthy();
    });
  });
});
