import { useContext, useState } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
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
      if (response.status == 200) {
        const token = await response.text();
        setIsAuthenticating(false);
        handleJWT(token, username);
        setFcn.setInfoToStore(token, username);
        navigation.navigate('Home');
      } else if (response.status == 401) {
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
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Proceed with your login</Text>
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
      <TouchableOpacity
        style={styles.loginButton}
        disabled={!(password && username)}
        onPress={authHandler}
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FECA6C',
    alignItems: 'center',
  },
 headerText:{
    fontSize:20,
    fontWeight: 'bold',
    marginTop:150,
    marginBottom: 80,
 },
  input: {
    height: 40,
    width:'70%',
    margin: 12,
    borderRadius: 6,
    borderWidth: 1,
    padding: 10,
  },
  loginButton: {
    backgroundColor: '#FF5400',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 25,
    marginTop: 20,
  },
  loginButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
