import React from 'react'
import { Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import EventList from './EventList';
import MasterList from './MasterList';


const Tab = createBottomTabNavigator();

export default function HomeScreen({ navigation }) {

  return (
    <>
      <Button title='login' onPress={() => navigation.navigate('Login')} />

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

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Events" component={EventList} />
        <Tab.Screen name="Masters" component={MasterList} />
      </Tab.Navigator>
    </>
  )
}