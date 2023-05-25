import React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import EventList from './EventList';
import MasterList from './MasterList';
import { useContext } from 'react';
import { AuthContent } from '../store/auth-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AuthButton from './ui/AuthButton';

const Tab = createBottomTabNavigator();

export default function HomeScreen({ navigation }) {
  const { storedInfo, setFcn } = useContext(AuthContent);
  return (
    <>
      {!storedInfo.isAuthenticated && (
        <View>
          <Button title='Login' onPress={() => navigation.navigate('Login')} />
          <AuthButton
            title='signUp'
            onPress={() => navigation.navigate('SignUp')}
          ></AuthButton>
        </View>
      )}
      {storedInfo.isAuthenticated && (
        <View>
          <View style={styles.container}>
            <Text style={styles.textWelcome}>
              Welcome {storedInfo.username}
            </Text>
          </View>
          <AuthButton
            title='Logout'
            onPress={() => setFcn.setAuthToken(null)}
          ></AuthButton>
        </View>
      )}
      {storedInfo.isAuthenticated && (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Events') {
                iconName = focused
                  ? 'ios-information-circle'
                  : 'ios-information-circle-outline';
              } else if (route.name === 'Masters') {
                iconName = focused ? 'ios-list' : 'ios-list-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name='Events' component={EventList} />
          <Tab.Screen name='Masters' component={MasterList} />
        </Tab.Navigator>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    padding: 5,
    backgroundColor: '#339FFF',
    borderRadius: 6,
  },
  textWelcome: {
    flex: 1,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  signUpButton: {
    color: 'grey',
    backgroundColor: 'white',
  },
});
