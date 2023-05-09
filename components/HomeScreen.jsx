import React from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import EventList from "./EventList";
import MasterList from "./MasterList";
import { useContext, useState } from "react";
import { AuthContent } from "../store/auth-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export default function HomeScreen({ navigation }) {
  
  const { storedUsername, isAuthenticated } = useContext(AuthContent);
  return (
    <>
      {!isAuthenticated && (
        <Button title="Login" onPress={() => navigation.navigate("Login")} />
      )}
      {isAuthenticated && (
        <View style={styles.container}>
          <Text style={styles.textWelcome}> Welcome {storedUsername}</Text>
        </View>
      )}
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Events") {
              iconName = focused
                ? "ios-information-circle"
                : "ios-information-circle-outline";
            } else if (route.name === "Masters") {
              iconName = focused ? "ios-list" : "ios-list-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Events" component={EventList} />
        <Tab.Screen name="Masters" component={MasterList} />
      </Tab.Navigator>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    padding: 5,
    backgroundColor: "#339FFF",
    borderRadius: 6,
  },
  textWelcome: {
    flex: 1,
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
});
