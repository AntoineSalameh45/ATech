/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as ATech} from './app.json';
import notifee from '@notifee/react-native';

notifee.onBackgroundEvent(async ({type, detail}) => {
  const {notification} = detail;
  await notifee.cancelNotification(notification.id);
});

AppRegistry.registerComponent(ATech, () => App);
