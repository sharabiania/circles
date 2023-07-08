import { useContext, useState} from 'react';
import {Text, SafeAreaView, TextInput, StyleSheet, Button,} from 'react-native';
import { AuthContent } from '../store/auth-context';
import { login } from '../util/auth';
import LoadingOverlay from './ui/LoadingOverlays';
import { handleJWT } from '../util/handleJWT';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { setFcn } = useContext(AuthContent);

  async function authHandler() {
    setIsAuthenticating(true);
    try {
      const response = await login(username, password);
      if (response.status==200){
        const token = await response.text();
        setIsAuthenticating(false);
        handleJWT(token, username);
        setFcn.setInfoToStore(token, username);
        navigation.navigate('Home');
      }else if (response.status== 401) {
        alert('credentials not correct');
        setIsAuthenticating(false);
      }
    } catch (error) {
      alert('server is down');
      setIsAuthenticating(false);
    }
  }
  if (isAuthenticating) {
    return <LoadingOverlay message='Logging you in...' />;
  }

  return (
    <SafeAreaView>
      <Text>Login</Text>
      <TextInput
        placeholder='Username'
        style={styles.input}
        onChangeText={setUsername}
        value={username}
      />

      <TextInput
        placeholder='Password'
        style={styles.input}
        secureTextEntry={true}
        onChangeText={setPassword}
        value={password}
      />
      <Button
        title='login'
        disabled={!(password && username)}
        onPress={authHandler}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderColor: 'gray',
    borderRadius: 6,
    borderWidth: 1,
    padding: 10,
  },
});
