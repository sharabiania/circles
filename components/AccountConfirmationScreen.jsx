import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { AuthContent } from '../store/auth-context';
import { signupConfirm, login } from '../util/auth';
import jwt_decode from 'jwt-decode';

export default function AccountConfirmationScreen({ navigation }) {
  const [code, setCode] = useState('');
  const { setFcn, storedInfo } = useContext(AuthContent);

  async function handleLoginRsp(response) {
   
    if (response.status !== 200) {
      alert('Server is down, try again');
    } else if (response.status == 200) {
      const token = await response.text();
      sparseJWT(token);
    }
  }

  function sparseJWT(token) {
    let decodedJWT = jwt_decode(token);
    setFcn.setInfoToStore(
      token,
      decodedJWT['cognito:username'],
      decodedJWT['exp']
    );
    navigation.navigate('Home');
  }

  async function handleConfirm() {
    try {
      const response = await signupConfirm(storedInfo.username, code);
      if (response.status == 200) {
        console.log('I am here and that is correct')
        const loginResponse = await login(
          storedInfo.username,
          storedInfo.password
        );
        handleLoginRsp(loginResponse);
      }else {
        alert(response.text());
      }
    } catch (error) {
      alert(error);
      //setFcn.logOut(null);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm Your Account</Text>
      <Text style={styles.subtitle}>
        Check your email for a confirmation code and enter it below:
      </Text>
      <TextInput
        style={styles.input}
        placeholder='Confirmation Code'
        value={code}
        onChangeText={setCode}
      />
      <TouchableOpacity style={styles.button} onPress={handleConfirm}>
        <Text style={styles.buttonText}>Confirm Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
