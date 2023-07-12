import React, { useState, useEffect } from 'react';
import {
  TextInput,
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { signup } from '../util/auth.js';

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPassValid, setIsPassValid] = useState(true);
  const [isCfPassValid, setIsCfPassValid] = useState(true);
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [validCredentials, setValidCredentials] = useState(false);

  const minLength = 8;

  useEffect(() => {
    if (!!password) setIsCfPassValid(password === confirmPassword);
  }, [password, confirmPassword]);

  useEffect(() => {
    if (!!password) {
      setIsPassValid(password.length >= minLength);
    }
  }, [password]);

  useEffect(() => {
    if (!!username)
      setIsUsernameValid(
        username.match(/^\d/) == null && username.length >= minLength
      );
  }, [username]);

  useEffect(() => {
    if (!!email) {
      setIsEmailValid(email.includes('@'));
    }
  }, [email]);

  useEffect(() => {
    if (email && username && password && confirmPassword)
      setValidCredentials(
        isCfPassValid && isPassValid && isUsernameValid && isEmailValid
      );
    else setValidCredentials(false);
  }, [isUsernameValid, isEmailValid, isPassValid, isCfPassValid]);

  async function signUpHandler() {
    if (validCredentials) {
      try {
        const response = await signup(username, email, password);
        if (response.status == 201) {
          navigation.navigate('Account Confirmation', {
            username: username,
            password: password,
          });
        }
        if (response.status != 201) {
          alert(response.stauts);
        }
      } catch (error) {
        alert(error);
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Sign up</Text>
      <TextInput
        placeholder='Username'
        style={isUsernameValid ? styles.input : styles.invalidInput}
        onChangeText={setUsername}
        value={username}
      />
      {!isUsernameValid && (
        <Text style={styles.errorText}>Username not valid</Text>
      )}

      <TextInput
        placeholder='Email'
        style={isEmailValid ? styles.input : styles.invalidInput}
        onChangeText={setEmail}
        value={email}
      />
      {!isEmailValid && <Text style={styles.errorText}>Email not valid</Text>}

      <TextInput
        placeholder='Password'
        style={isPassValid ? styles.input : styles.invalidInput}
        secureTextEntry={true}
        onChangeText={setPassword}
        value={password}
      />
      {!isPassValid && <Text style={styles.errorText}>Password not valid</Text>}

      <TextInput
        placeholder='Confirm Password'
        style={isCfPassValid ? styles.input : styles.invalidInput}
        secureTextEntry={true}
        onChangeText={setConfirmPassword}
        value={confirmPassword}
      />
      {!isCfPassValid && (
        <Text style={styles.errorText}>
          The confirmed password does not match
        </Text>
      )}

      <TouchableOpacity
      style={styles.signUpButton}
        disabled={!validCredentials}
        onPress={signUpHandler}
      >
        <Text style={styles.signUpButtonText}>Sing up</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FECA6C',
    alignItems: 'center'
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom:30,
    marginTop: 80,
  },
  input: {
    height: 40,
    width: '70%',
    margin: 12,
    borderRadius: 6,
    borderWidth: 1,
    padding: 10,
  },
  invalidInput: {
    height: 40,
    width: '70%',
    margin: 12,
    marginBottom: 2,
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
  },
  errorText: {
    marginTop: 0,
    marginBottom: 10,
    marginLeft: 12,
    paddingRight: 10,
    color: '#FF5400',
  },





signUpButton: {
  backgroundColor: '#FF5400',
  borderRadius: 6,
  paddingVertical: 10,
  paddingHorizontal: 25,
  marginTop: 20,
},
signUpButtonText: {
  color: '#000000',
  fontSize: 16,
  fontWeight: 'bold',
  textAlign: 'center',
},



 
});
