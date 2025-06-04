/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as ATech} from './app.json';
import notifee, { EventType } from '@notifee/react-native';
import { Linking } from 'react-native';

notifee.onBackgroundEvent(async ({ type, detail }) => {
  const { notification } = detail;
  if (type === EventType.ACTION_PRESS && notification.data?.productId) {
    const url = `atech://home/products/details/${notification.data.productId}`;
    await Linking.openURL(url);
  }
  await notifee.cancelNotification(notification.id);
});

notifee.onForegroundEvent(async ({ type, detail }) => {
  const { notification } = detail;
  console.log('Notification data:', notification.data.productId);
  if (type === EventType.ACTION_PRESS && notification.data?.productId) {
    const url = `atech://home/products/details/${notification.data.productId}`;
    await Linking.openURL(url);
  }
});

AppRegistry.registerComponent(ATech, () => App);
