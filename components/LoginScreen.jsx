import React from 'react'
import { Text, TextInput, SafeAreaView, StyleSheet } from 'react-native';

export default function LoginScreen({navigation}) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
    return (
        <SafeAreaView>
          <TextInput 
            placeholder='Username'
            style={styles.input}
            onChangeText={setUsername} value={username} />
          <TextInput 
            placeholder='Password'
            style={styles.input}
            onChangeText={setPassword} value={password} />
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