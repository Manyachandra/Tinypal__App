/**
 * Tiny App - Educational Mobile Application
 * Main entry point for the application
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigator from './src/navigation/AppNavigator';

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="#1A1A2E" />
      <AppNavigator />
    </GestureHandlerRootView>
  );
}

export default App;
