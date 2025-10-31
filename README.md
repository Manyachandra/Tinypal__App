# TinyPal Mobile Application

A React Native mobile application for AI-powered parenting assistance, featuring "Did You Know" cards, interactive flashcards, and an AI learning assistant named Tinu.

## 📱 Project Overview

TinyPal is a mobile application designed to help parents with science-backed parenting strategies. The app provides:
- **Did You Know Cards**: Informative parenting tips and insights
- **Interactive Flashcards**: Learning tools for parenting strategies
- **Tinu AI Assistant**: Contextual AI help via an interactive bottom sheet

## 🎯 Features

- ✨ Beautiful, modern UI matching provided Figma design
- 🎴 Interactive card-based interface
- 🔄 Smooth flip animations for flashcards
- 🤖 AI-powered bottom sheet assistant (Tinu)
- 🎨 Color-coded chip selections with horizontal scrolling
- 📱 Optimized for Android devices
- 🔌 Full API integration with backend services

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

### Required Software

1. **Node.js** (version 18 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **npm** (comes with Node.js)
   - Verify installation: `npm --version`

3. **React Native CLI**
   - Install globally: `npm install -g react-native-cli`

4. **Java Development Kit (JDK) 17**
   - **macOS**: `brew install openjdk@17`
   - **Windows/Linux**: Download from https://adoptium.net/
   - Verify installation: `java -version`

5. **Android Studio** (for Android development)
   - Download from: https://developer.android.com/studio
   - Install Android SDK (API level 23 or higher)
   - Install Android SDK Platform-Tools
   - Set up Android Virtual Device (AVD) for emulator

### Environment Variables

Add these to your shell profile (`~/.zshrc` or `~/.bash_profile`):

```bash
# Java Home
export JAVA_HOME=$(/usr/libexec/java_home -v 17)

# Android SDK (adjust path as needed)
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
```

After adding, reload your profile:
```bash
source ~/.zshrc  # or source ~/.bash_profile
```

---

## 🚀 Installation and Setup

### Step 1: Clone or Extract the Repository

If you received a ZIP file:
```bash
# Extract the ZIP file
unzip TinyPal_Assignment_Submission.zip
cd TinyAppWorking
```

If you have a Git repository:
```bash
# Clone the repository
git clone <repository-url>
cd TinyAppWorking
```

### Step 2: Install Dependencies

Install all required npm packages:

```bash
npm install
```

This will install all dependencies listed in `package.json`, including:
- React Native 0.75.4
- React Navigation
- React Native Reanimated
- Axios
- @gorhom/bottom-sheet
- And all other required packages

### Step 3: Verify Android Setup

Check that your Android environment is properly configured:

```bash
npx react-native doctor
```

This command will verify:
- Node.js installation
- Android SDK installation
- Android Studio configuration
- JDK installation

Fix any issues reported before proceeding.

### Step 4: Start Metro Bundler

Open a terminal in the project root and start Metro:

```bash
npm start
```

Or:

```bash
npx react-native start
```

**Keep this terminal running** - it's the JavaScript bundler.

---

## 📱 Running the Application

### Running on Android

#### Option 1: Using Android Emulator

1. **Start Android Studio**
2. **Open AVD Manager**: Tools → Device Manager
3. **Create/Start an AVD**: 
   - Recommended: Pixel 5 or similar
   - API Level: 23 or higher
   - System Image: Android 11+ recommended

4. **Run the app** (in a new terminal, keep Metro running):
```bash
npm run android
```

Or:
```bash
npx react-native run-android
```

The app will install and launch automatically on the emulator.

#### Option 2: Using Physical Android Device

1. **Enable Developer Options** on your Android device:
   - Go to Settings → About Phone
   - Tap "Build Number" 7 times
   
2. **Enable USB Debugging**:
   - Go to Settings → Developer Options
   - Enable "USB Debugging"

3. **Connect device via USB**

4. **Verify device connection**:
```bash
adb devices
```
You should see your device listed.

5. **Run the app**:
```bash
npm run android
```

#### Option 3: Installing Pre-built APK

If you have the `app-release.apk` file:

1. **Transfer APK to device** via USB, email, or cloud storage

2. **Install on device**:
   - Enable "Install from Unknown Sources" in device settings
   - Tap the APK file to install
   - Open the app

Or install via adb:
```bash
adb install app-release.apk
```

### Running on iOS (Future Support)

iOS support requires macOS with Xcode installed.

```bash
# Install CocoaPods dependencies
cd ios
pod install
cd ..

# Run on iOS simulator
npm run ios
```

Or:
```bash
npx react-native run-ios
```

**Note**: iOS setup was not completed for this assignment due to CocoaPods/Ruby compatibility issues. The app is fully functional on Android.

---

## 🧪 Testing the Application

### Manual Testing Workflow

1. **Launch the app** - You'll see the "Did You Know" screen
2. **Scroll through DYK cards** - View parenting tips
3. **Tap "Flash Cards →" button** - Navigate to flashcards
4. **Tap a flashcard** - See the flip animation
5. **Navigate between cards** - Use arrow buttons (← →)
6. **Tap "Ask Tinu" button** - Open the Tinu bottom sheet
7. **Expand Tinu** - Drag up to see more content
8. **Scroll chips horizontally** - View "Share more context of Arya" options
9. **Type in input box** - Test the "Ask me anything..." field
10. **Tap send button** - Test message submission

### Expected Behavior

✅ **Did You Know Screen**:
- Cards display with pink background
- "DID YOU KNOW?" circular badge visible
- Badges with emojis at top of content
- Tinu avatar at bottom center
- Source citation visible
- Smooth scrolling

✅ **Flash Card Screen**:
- Cards display with blue background
- Counter badge in top-left (1, 2, 3...)
- Tap to flip animation works smoothly
- Front shows question, back shows answer
- Arrow navigation works
- Counter updates correctly

✅ **Tinu Bottom Sheet**:
- Opens with smooth animation
- Header shows Tinu avatar and gradient
- Cards display with share (⎙) and bookmark (★) buttons
- "Share more context of Arya" chips scroll horizontally
- Chips have different colors (peach, blue, pink)
- Text input accepts typing
- Mic button (🎤) and Send button (↑) are visible and touchable
- No SVG code visible anywhere
- All text is clean and readable

---

## 🛠️ Troubleshooting

### Common Issues and Solutions

#### Issue: "Could not connect to development server"
**Solution**:
```bash
# Reset Metro cache
npm start -- --reset-cache

# Or
npx react-native start --reset-cache
```

#### Issue: "Task :app:installDebug FAILED"
**Solution**:
```bash
# Clean build
cd android
./gradlew clean
cd ..

# Rebuild
npm run android
```

#### Issue: "SDK location not found"
**Solution**:
Create `android/local.properties`:
```
sdk.dir=/Users/YOUR_USERNAME/Library/Android/sdk
```

#### Issue: "Unable to locate Java Runtime"
**Solution**:
```bash
# Install JDK 17
brew install openjdk@17

# Set JAVA_HOME
export JAVA_HOME=$(/usr/libexec/java_home -v 17)

# Add to ~/.zshrc to make permanent
echo 'export JAVA_HOME=$(/usr/libexec/java_home -v 17)' >> ~/.zshrc
```

#### Issue: Red screen errors in app
**Solution**:
1. Reload app: Shake device → "Reload"
2. Or press `R` twice in Metro terminal

#### Issue: Metro bundler not starting
**Solution**:
```bash
# Kill existing processes
lsof -ti:8081 | xargs kill

# Restart Metro
npm start
```

#### Issue: Emulator not appearing
**Solution**:
```bash
# List available emulators
emulator -list-avds

# Start specific emulator
emulator -avd YOUR_AVD_NAME
```

---

## 📦 Building for Production

### Generate Release APK

1. **Navigate to Android directory**:
```bash
cd android
```

2. **Clean previous builds**:
```bash
./gradlew clean
```

3. **Generate release APK**:
```bash
./gradlew assembleRelease
```

4. **Locate the APK**:
```
android/app/build/outputs/apk/release/app-release.apk
```

5. **Test the APK**:
```bash
adb install app/build/outputs/apk/release/app-release.apk
```

### Build Configuration

The release APK is built with:
- **minSdkVersion**: 23 (Android 6.0)
- **targetSdkVersion**: 34 (Android 14)
- **compileSdkVersion**: 35
- **Architecture**: arm64-v8a, armeabi-v7a, x86, x86_64

---

## 📁 Project Structure

```
TinyAppWorking/
├── android/                    # Android native code
│   ├── app/
│   │   ├── build/             # Build outputs (APK here)
│   │   └── src/               # Android source
│   ├── gradle/                # Gradle wrapper
│   └── build.gradle           # Main build config
│
├── src/                       # Application source code
│   ├── components/            # Reusable UI components
│   │   ├── Card.js           # Card component
│   │   ├── Chip.js           # Chip component
│   │   └── TinuBottomSheet.js # Bottom sheet
│   │
│   ├── screens/              # Screen components
│   │   ├── DidYouKnowScreen.js
│   │   └── FlashCardScreen.js
│   │
│   ├── navigation/           # Navigation setup
│   │   └── AppNavigator.js
│   │
│   ├── services/             # API services
│   │   └── api.js
│   │
│   └── constants/            # Constants and config
│       └── config.js         # API URLs, colors
│
├── App.tsx                   # Root component
├── package.json              # Dependencies
├── babel.config.js           # Babel config
└── README.md                 # This file
```

---

## 🔌 API Integration

The app integrates with the following APIs:

### Base URL
```
https://genai-images-4ea9c0ca90c8.herokuapp.com
```

### Endpoints

1. **`POST /p13n_answers`**
   - Fetches DYK cards and flashcards
   - Called on screen mount
   
2. **`POST /activate_tinu`**
   - Gets Tinu assistant responses
   - Called when user taps card or "Ask Tinu"

### API Service
Located in `src/services/api.js`, provides:
- `fetchP13nAnswers()`: Get cards data
- `activateTinu(cardData)`: Get Tinu assistance

---

## 🎨 Design Implementation

The app faithfully implements the Figma design with:
- ✅ Color scheme matching design system
- ✅ Component hierarchy from design
- ✅ Typography and spacing as specified
- ✅ Animations and interactions
- ✅ Icons and imagery placeholders

**Design Reference**: [Figma Design Link](https://www.figma.com/design/uTAIYxrZlMNDCkUKCGtYmY/Figma-Designs-Hiring-Assignments)

---

## 📚 Included Deliverables

This submission includes:

### 1. Source Code
- Complete React Native project (`TinyAppWorking/` directory)
- All components, screens, and services
- Configuration files
- Build scripts

### 2. Android APK
- `app-release.apk` - Ready-to-install Android application
- Compatible with Android 6.0+ (API 23+)
- Supports arm64-v8a and armeabi-v7a architectures

### 3. Documentation
- **README.md** (this file) - Setup and running instructions
- **SYSTEM_DESIGN_DOCUMENT.md** - Comprehensive system design documentation
  - Component breakdown
  - Architecture overview
  - API integration details
  - GenAI usage documentation

### 4. Additional Files
- **package.json** - Dependency list
- **babel.config.js** - Babel configuration
- **Build configurations** - Android Gradle files

---

## 🤖 Technology Stack

### Core
- **React Native**: 0.75.4
- **React**: 18.3.1
- **TypeScript**: 5.0.4

### Navigation & UI
- **@react-navigation/native**: 6.1.18
- **@react-navigation/stack**: 6.4.1
- **@gorhom/bottom-sheet**: 4.6.4
- **react-native-gesture-handler**: 2.14.1
- **react-native-screens**: 3.29.0

### Animation
- **react-native-reanimated**: 3.15.0
- **react-native-worklets-core**: 1.4.0

### Networking
- **axios**: 1.7.8

### Development
- **@react-native/metro-config**: 0.75.4
- **@babel/core**: 7.25.9
- **@babel/preset-env**: 7.25.9

---

## 📄 License

This project was created as part of a hiring assignment for TinyPal.

---

## 👤 Developer

**Name**: Vankit  
**Project**: TinyPal Full-Stack Founding Engineer Intern Hiring Assignment  
**Date**: October 31, 2025

---

## 🙏 Acknowledgments

- **TinyPal Team**: For the assignment opportunity and design specifications
- **Claude Sonnet 4.5 AI**: For AI-assisted development (see System Design Document)
- **React Native Community**: For excellent documentation and libraries

---

## 📞 Support

For issues or questions:
1. Check the Troubleshooting section above
2. Review the System Design Document
3. Check React Native documentation: https://reactnative.dev/
4. Review Android Studio setup: https://developer.android.com/studio

---

## ✅ Quick Start Checklist

- [ ] Node.js 18+ installed
- [ ] JDK 17 installed and JAVA_HOME set
- [ ] Android Studio installed
- [ ] Android SDK (API 23+) installed
- [ ] Environment variables configured
- [ ] Android emulator created or physical device connected
- [ ] Dependencies installed (`npm install`)
- [ ] Metro bundler started (`npm start`)
- [ ] App running (`npm run android`)

---

**🎉 You're all set! Enjoy exploring the TinyPal app!**

