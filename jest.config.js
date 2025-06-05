module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    "node_modules/(?!(react-native" +
      "|@react-native" +
      "|@react-navigation" +
      "|react-clone-referenced-element" +
      "|@react-native-community" +
      ")/)"
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
