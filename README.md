# ATech

ATech is a React Native application designed to provide a seamless shopping experience for tech enthusiasts. The app features user authentication, a dynamic theme switcher, and a curated list of tech products with detailed descriptions.

## Features

- **User Authentication**: Sign up, log in, and manage user sessions with [`AuthContext`](src/stores/AuthContext/AuthContext.tsx).
- **Dynamic Theming**: Switch between light and dark themes using [`ThemeContext`](src/stores/ThemeContext/ThemeContext.tsx).
- **Product Listings**: Browse a list of tech products with detailed descriptions and images.
- **Navigation**: Navigate between screens using React Navigation.
- **Responsive Design**: Optimized for both Android and iOS devices.

## Getting Started

> **Note**: Ensure your development environment is set up as per the [React Native Environment Setup Guide](https://reactnative.dev/docs/environment-setup).

### Step 1: Install Dependencies

Install the required dependencies for the project:

```sh
# Install Node.js dependencies
npm install

# OR using Yarn
yarn install

# Install iOS dependencies (only for macOS users)
bundle install
bundle exec pod install --project-directory=ios
```

### Step 2: Set Up Environment

The project has three environments: `development`, `staging`, and `production`. Set the desired environment using the following command:

```sh
# Replace "your_env" with development, staging, or production
export ENVFILE=.env.your_env
```

### Step 3: Start Metro

Start the Metro bundler, the JavaScript build tool for React Native:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

### Step 4: Run the App

#### Android

To run the app on an Android device or emulator, use the following commands:

```sh
# For development environment
cd android && ./gradlew installDevDebug && cd ..

# For staging environment
cd android && ./gradlew installStagingDebug && cd ..

# For production environment
cd android && ./gradlew installProdRelease && cd ..
```

#### iOS

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

## Fonts

The app uses custom fonts:

- **Rancho**: [Rancho-Regular.ttf](src/assets/fonts/Rancho-Regular.ttf)

The fonts are linked in the project via [`react-native.config.js`](react-native.config.js).

## Troubleshooting

If you encounter issues, refer to the [React Native Troubleshooting Guide](https://reactnative.dev/docs/troubleshooting).

## Learn More

To learn more about React Native, check out the following resources:

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [React Navigation](https://reactnavigation.org/docs/getting-started)
- [Zod Validation](https://zod.dev/)
- [React Hook Form](https://react-hook-form.com/)

## License

This project is licensed under the MIT License.
