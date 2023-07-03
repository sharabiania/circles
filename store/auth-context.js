import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useState, useEffect } from 'react';

export const AuthContent = createContext({});

export default function AuthContentProvider(props) {
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');
  const [expiration, setExpiration] = useState('');

  const settingUsername = (username) => {
    setUsername(username);
  };
  

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token');
      const storedExpiration = await AsyncStorage.getItem('expiration');
      const storedUsername = await AsyncStorage.getItem('username');
      setInfoToStore(storedToken, storedUsername, storedExpiration);
    }
    fetchToken();
    
  }, []);

  const setInfoToStore = (token, username, expiration) => {
    setToken(token);
    setUsername(username);
    setExpiration(expiration);
  };

  const logOut = () => {
    setToken(null);
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('expiration');
    AsyncStorage.removeItem('username');
  };

  const storedInfo = {
    username: username,
    token: token,
    isAuthenticated: !!token,
    expiration: expiration,
  };

  const setFcn = {
    setInfoToStore: setInfoToStore,
    logOut: logOut,
    settingUsername:settingUsername,
  };
  const value = {
    storedInfo: storedInfo,
    setFcn: setFcn,
  };

  return (
    <AuthContent.Provider value={value}>{props.children}</AuthContent.Provider>
  );
}
