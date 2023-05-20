import React from 'react';
import AuthContentProvider from './store/auth-context';
import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from './components/RegisterScreen';
import AccountConfirmationScreen from './components/AccountConfirmationScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthContentProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'HOME' }}
          />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={RegisterScreen} />
          <Stack.Screen
            name="Account Confirmation"
            component={AccountConfirmationScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContentProvider>
  );
}
