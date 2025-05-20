import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Keyboard } from 'react-native';
import { useTheme } from '../../../stores/ThemeContext';
import { getDynamicStyles } from './styles';

interface TabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
  icons: any;
}

const MyTabBar = ({ state, navigation, icons }: TabBarProps) => {
  const { theme } = useTheme();
  const styles = getDynamicStyles(theme);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () =>
      setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () =>
      setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  if (isKeyboardVisible) {
    return null; // Hide the tab bar when the keyboard is visible
  }

  return (
    <View style={styles.tabBar}>
      <View style={styles.tabContainer}>
        {state.routes.map((route: any, index: number) => {
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const Icon = icons[index];

          // Apply dynamic styles for border radius based on the position
          const buttonStyle = [
            styles.tabButton,
            isFocused && styles.tabButtonFocused,
            index === 0 && styles.tabButtonLeft, // Leftmost button
            index === state.routes.length - 1 && styles.tabButtonRight, // Rightmost button
          ];

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={onPress}
              onLongPress={onLongPress}
              style={buttonStyle}
            >
              <Icon width={24} height={24} />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default MyTabBar;
