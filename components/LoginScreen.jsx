import React from 'react'
import { Button, TextInput, Text, SafeAreaView, StyleSheet } from 'react-native';

// NOTE: use this maybe: https://www.npmjs.com/package/react-native-login-screen
export default function LoginScreen({navigation}) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
    return (
        <SafeAreaView>
          <Text>Login</Text>
          <TextInput 
            placeholder='Username'
            style={styles.input}
            onChangeText={setUsername} value={username} />
          <TextInput 
            placeholder='Password'
            style={styles.input}
            onChangeText={setPassword} value={password} />
          <Button title='login' />
          <Text>Register</Text>          
          <Text>under construction...</Text>
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