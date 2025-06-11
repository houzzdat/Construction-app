# Construction Project Management Mobile App

A comprehensive mobile application for construction project management, built with React Native.

## Features

- Project Planning & Scheduling
- Material Procurement & Inventory
- Labor Management & HR
- Safety Management
- Financial Management
- Quality Control
- Communication & Collaboration

## Prerequisites

- Node.js >= 14
- npm or yarn
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

## Setup Instructions

1. Clone the repository:
```bash
git clone [repository-url]
cd construction-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Install iOS dependencies (macOS only):
```bash
cd ios
pod install
cd ..
```

4. Start the Metro bundler:
```bash
npm start
# or
yarn start
```

5. Run the app:
```bash
# For Android
npm run android
# or
yarn android

# For iOS (macOS only)
npm run ios
# or
yarn ios
```

## Project Structure

```
src/
├── assets/          # Images, fonts, and other static assets
├── components/      # Reusable UI components
├── navigation/      # Navigation configuration
├── screens/         # Screen components
├── services/        # API and other services
├── store/          # State management
├── theme/          # Theme configuration
└── utils/          # Utility functions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 