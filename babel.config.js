module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
      },
    ],
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          'moti/skeleton': 'moti/skeleton/react-native-linear-gradient',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
