import React, { useState } from "react";
import {
  Button,
  TextInput,
  Text,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import Register from "./Register";
import { logInUser } from "../util/auth";
//import Snackbar from "react-native-snackbar";
import AuthContextProvider, { AuthContext } from "../store/auth-context";
import LoadingOverlay from "./ui/LaodingOverlays";

// NOTE: use this maybe: https://www.npmjs.com/package/react-native-login-screen
export default function LoginScreen({ navigation }) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function logInHandler() {
    setIsAuthenticating(true);
    try {
      const token = await logInUser(username, password);
      console.log(token);
      navigation.navigate("Home");
    } catch (error) {
      alert("Your credentials is not correct", "Try again");
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return (
    <SafeAreaView>
      <Text>Login</Text>
      <TextInput
        placeholder="Username"
        style={styles.input}
        onChangeText={setUsername}
        value={username}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry={true}
        onChangeText={setPassword}
        value={password}
      />
      <Button
        title="login"
        disabled={!(password && username)}
        onPress={logInHandler}
      />
      <Register />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
