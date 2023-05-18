import { createContext, useState } from 'react';

export const AuthContent = createContext({});

export default function AuthContentProvider(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [expiration, setExpiration] = useState('');

  const setAuthUsername = (username) => {
    setUsername(username);
  };
  const setAuthPass = (username) => {
    setPassword(username);
  };
  const setAuthToken = (token) => {
    setToken(token);
  };
  const setEmailAdress = (email) => {
    setEmail(email);
  };
  const setExpTime = (expiration) => {
    setExpiration(expiration);
  };

  const storedInfo = {
    username: username,
    password: password,
    email: email,
    token: token,
    isAuthenticated: !!token,
    expiration: expiration,
  };

  const setFcn = {
    setAuthToken: setAuthToken,
    setAuthUsername: setAuthUsername,
    setEmailAdress: setEmailAdress,
    setExpTime: setExpTime,
    setAuthPass: setAuthPass,
  };

  const value = {
    storedInfo: storedInfo,
    setFcn: setFcn,
  };

  return (
    <AuthContent.Provider value={value}>{props.children}</AuthContent.Provider>
  );
}
