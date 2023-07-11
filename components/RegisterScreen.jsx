import React, { useState, useEffect} from 'react';
import {TextInput, Text, SafeAreaView, StyleSheet, Button} from 'react-native';
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
          navigation.navigate('Account Confirmation', {username: username, password: password});
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
    <SafeAreaView>
      <Text>Register</Text>
      <TextInput
        placeholder='Username'
        style={isUsernameValid ? styles.input : styles.inputNotValid}
        onChangeText={setUsername}
        value={username}
      />
      {!isUsernameValid && (
        <Text style={styles.errorText}>Username not valid</Text>
      )}

      <TextInput
        placeholder='Email'
        style={isEmailValid ? styles.input : styles.inputNotValid}
        onChangeText={setEmail}
        value={email}
      />
      {!isEmailValid && <Text style={styles.errorText}>Email not valid</Text>}

      <TextInput
        placeholder='Password'
        style={isPassValid ? styles.input : styles.inputNotValid}
        secureTextEntry={true}
        onChangeText={setPassword}
        value={password}
      />
      {!isPassValid && <Text style={styles.errorText}>Password not valid</Text>}

      <TextInput
        placeholder='Confirm Password'
        style={isCfPassValid ? styles.input : styles.inputNotValid}
        secureTextEntry={true}
        onChangeText={setConfirmPassword}
        value={confirmPassword}
      />
      {!isCfPassValid && (
        <Text style={styles.errorText}>
          The confirmed password does not match
        </Text>
      )}

      <Button
        title='sign Up'
        disabled={!validCredentials}
        onPress={signUpHandler}
      ></Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
  },
  inputNotValid: {
    height: 40,
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
    color: 'red',
  },
});
