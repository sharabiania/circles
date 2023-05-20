import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const SignUpButton = ({ title, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

export default SignUpButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    padding: 2,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
  },
  buttonText: {
    color: 'gray',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 13,
  },
});

