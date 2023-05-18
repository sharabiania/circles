import { useContext, useState } from 'react';
import {
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Button,
} from 'react-native';
import { AuthContent } from '../store/auth-context';
import { login } from '../util/auth';
import LoadingOverlay from './ui/LoadingOverlays';
import jwt_decode from 'jwt-decode';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const { setFcn } = useContext(AuthContent);

  function sparseJWT(token) {
    setFcn.setAuthToken(token);
    let decodedJWT = jwt_decode(token);
    if (username == decodedJWT['cognito:username']) {
      setFcn.setAuthUsername(username);
      setFcn.setEmailAdress(decodedJWT['email']);
      setFcn.setExpTime(decodedJWT['exp']);
      navigation.navigate('Home');
    } else {
      setFcn.setAuthToken('null');
    }
  }

  async function checkValidAuth(response, status) {
    if (status == 401) {
      alert('credentials not correct');
    } else if (status == 200) {
      const token = await response.text();
      sparseJWT(token);
    }
  }

  async function authHandler() {
    setIsAuthenticating(true);
    try {
      const response = await login(username, password);
      const status = response.status;
      checkValidAuth(response, status);
      setIsAuthenticating(false);
    } catch (error) {
      alert('server is down');
      setAuthToken(null);
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
