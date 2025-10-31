import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DidYouKnowScreen from '../screens/DidYouKnowScreen';
import FlashCardScreen from '../screens/FlashCardScreen';
import { COLORS } from '../constants/config';

const Stack = createStackNavigator();

/**
 * App Navigator
 * Manages screen navigation for the application
 */
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="DidYouKnow"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: COLORS.background },
        }}
      >
        <Stack.Screen
          name="DidYouKnow"
          component={DidYouKnowScreen}
          options={{ title: 'Did You Know' }}
        />
        <Stack.Screen
          name="FlashCard"
          component={FlashCardScreen}
          options={{ title: 'Flash Cards' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

