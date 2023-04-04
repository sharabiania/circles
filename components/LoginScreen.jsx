import React from 'react'
import { Button, TextInput, SafeAreaView, StyleSheet } from 'react-native';

// NOTE: use this maybe: https://www.npmjs.com/package/react-native-login-screen
export default function LoginScreen({navigation}) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
    return (
        <SafeAreaView>
          <h1>Login</h1>
          <TextInput 
            placeholder='Username'
            style={styles.input}
            onChangeText={setUsername} value={username} />
          <TextInput 
            placeholder='Password'
            style={styles.input}
            onChangeText={setPassword} value={password} />
          <Button title='login' />
          <h1>Register</h1>
          <hr/>
          <p>under construction...</p>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10
  }
});