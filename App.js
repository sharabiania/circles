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
            name='Home'
            component={HomeScreen}
            options={{ headerShown: false}}
          />
          <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false}}/>
          <Stack.Screen name='SignUp' component={RegisterScreen} options={{ headerShown: false}}/>
          <Stack.Screen
            name='Account Confirmation'
            component={AccountConfirmationScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContentProvider>
  );
}
