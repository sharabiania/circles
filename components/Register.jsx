import React from 'react'
import { TextInput, Text, SafeAreaView, StyleSheet } from 'react-native';

// NOTE: use this maybe: https://www.npmjs.com/package/react-native-login-screen
export default function Register({navigation}) {

  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  
    return (
        <SafeAreaView>
          <Text>Register</Text>
          <TextInput 
            placeholder='Username'
            style={styles.input}
            onChangeText={setUsername} value={username} />

          <TextInput 
            placeholder='Email'
            style={styles.input}
            onChangeText={setPassword} value={email} />
        
          <TextInput 
            placeholder='Password'
            style={styles.input}
            onChangeText={setPassword} value={password} />

          <TextInput 
            placeholder='Confirm Password'
            style={styles.input}
            onChangeText={setConfirmPassword} value={confirmPassword} />

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