import {ONE_SIGNAL_APIKEY, ONE_SIGNAL_APPID} from '@env';

export const onesignalNotifications = () => {
  const url = 'https://onesignal.com/api/v1/notifications';
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      Authorization: `Basic ${ONE_SIGNAL_APIKEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      app_id: ONE_SIGNAL_APPID,
      headings: {en: 'Product posted'},
      contents: {en: 'Your product has been uploaded successfully'},
      included_segments: ['Test Users'],
      android_sound: 'lightsaber',
      android_accent_color: '87CEEB',
      small_icon: 'ic_small_icon',
    }),
  };
  fetch(url, options)
    .then(response => response.json())
    .then(response => {
      if (response.errors) {
        console.error('OneSignal Error:', response.errors);
      } else {
        console.log('OneSignal Success:', response);
      }
    })
};
